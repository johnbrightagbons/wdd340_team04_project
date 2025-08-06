import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUser } from '@/app/lib/auth'

const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1')
})

const updateCartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1')
})

// GET - Get user's cart
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: currentUser.userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                artisan: true
              }
            }
          }
        }
      }
    })

    if (!cart) {
      // Create empty cart if it doesn't exist
      cart = await prisma.cart.create({
        data: {
          userId: currentUser.userId,
          total: 0,
          itemCount: 0
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  artisan: true
                }
              }
            }
          }
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: cart
    })

  } catch (error) {
    console.error('Get cart error:', error)
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = addToCartSchema.parse(body)

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId }
    })
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      )
    }

    if (!product.inStock) {
      return NextResponse.json(
        { success: false, message: 'Product is out of stock' },
        { status: 400 }
      )
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: currentUser.userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })
    
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: currentUser.userId,
          total: 0,
          itemCount: 0
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      })
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      item => item.productId === validatedData.productId
    )

    if (existingItem) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + validatedData.quantity }
      })
    } else {
      // Add new item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: validatedData.productId,
          quantity: validatedData.quantity,
          price: product.price
        }
      })
    }

    // Update cart totals
    await updateCartTotals(cart.id)

    // Get updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                artisan: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Item added to cart',
      data: updatedCart
    })

  } catch (error) {
    console.error('Add to cart error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update cart item
export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updateCartItemSchema.parse(body)

    const cart = await prisma.cart.findUnique({
      where: { userId: currentUser.userId },
      include: {
        items: {
          where: { productId: validatedData.productId }
        }
      }
    })
    
    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      )
    }

    const item = cart.items[0]
    if (!item) {
      return NextResponse.json(
        { success: false, message: 'Item not found in cart' },
        { status: 404 }
      )
    }

    // Update item quantity
    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity: validatedData.quantity }
    })

    // Update cart totals
    await updateCartTotals(cart.id)

    // Get updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                artisan: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Cart updated',
      data: updatedCart
    })

  } catch (error) {
    console.error('Update cart error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      )
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: currentUser.userId },
      include: {
        items: {
          where: { productId }
        }
      }
    })
    
    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      )
    }

    // Remove item from cart
    if (cart.items.length > 0) {
      await prisma.cartItem.delete({
        where: { id: cart.items[0].id }
      })
    }

    // Update cart totals
    await updateCartTotals(cart.id)

    // Get updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                artisan: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart',
      data: updatedCart
    })

  } catch (error) {
    console.error('Remove from cart error:', error)
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to update cart totals
async function updateCartTotals(cartId: string) {
  const items = await prisma.cartItem.findMany({
    where: { cartId },
    include: { product: true }
  })

  const total = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  await prisma.cart.update({
    where: { id: cartId },
    data: {
      total,
      itemCount
    }
  })
} 