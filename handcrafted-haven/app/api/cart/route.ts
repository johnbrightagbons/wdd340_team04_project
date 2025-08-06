import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import connectDB from '@/app/lib/database'
import Cart from '@/app/models/Cart'
import Product from '@/app/models/Product'
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
    const currentUser = getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    await connectDB()

    let cart = await Cart.findOne({ userId: currentUser.userId })
      .populate('items.productId', 'name price imageUrl artisanName')

    if (!cart) {
      // Create empty cart if it doesn't exist
      cart = new Cart({
        userId: currentUser.userId,
        items: [],
        total: 0,
        itemCount: 0
      })
      await cart.save()
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
    const currentUser = getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    await connectDB()

    const body = await request.json()
    const validatedData = addToCartSchema.parse(body)

    // Verify product exists
    const product = await Product.findById(validatedData.productId)
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
    let cart = await Cart.findOne({ userId: currentUser.userId })
    
    if (!cart) {
      cart = new Cart({
        userId: currentUser.userId,
        items: [],
        total: 0,
        itemCount: 0
      })
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === validatedData.productId
    )

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += validatedData.quantity
    } else {
      // Add new item
      cart.items.push({
        productId: validatedData.productId,
        quantity: validatedData.quantity,
        price: product.price
      })
    }

    await cart.save()

    // Populate product details
    await cart.populate('items.productId', 'name price imageUrl artisanName')

    return NextResponse.json({
      success: true,
      message: 'Item added to cart',
      data: cart
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

// PUT - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const currentUser = getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    await connectDB()

    const body = await request.json()
    const validatedData = updateCartItemSchema.parse(body)

    const cart = await Cart.findOne({ userId: currentUser.userId })
    
    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      )
    }

    // Find and update item
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === validatedData.productId
    )

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Item not found in cart' },
        { status: 404 }
      )
    }

    cart.items[itemIndex].quantity = validatedData.quantity
    await cart.save()

    // Populate product details
    await cart.populate('items.productId', 'name price imageUrl artisanName')

    return NextResponse.json({
      success: true,
      message: 'Cart updated',
      data: cart
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
    const currentUser = getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      )
    }

    const cart = await Cart.findOne({ userId: currentUser.userId })
    
    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      )
    }

    // Remove item from cart
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    )

    await cart.save()

    // Populate product details
    await cart.populate('items.productId', 'name price imageUrl artisanName')

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    })

  } catch (error) {
    console.error('Remove from cart error:', error)
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 