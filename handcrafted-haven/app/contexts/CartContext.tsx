'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface CartItem {
  productId: string
  product: {
    _id: string
    name: string
    price: number
    imageUrl?: string
    artisanName: string
  }
  quantity: number
  price: number
}

interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

interface CartContextType {
  cart: Cart | null
  loading: boolean
  addToCart: (productId: string, quantity: number, product: any) => Promise<{ success: boolean; message: string }>
  updateCartItem: (productId: string, quantity: number) => Promise<{ success: boolean; message: string }>
  removeFromCart: (productId: string) => Promise<{ success: boolean; message: string }>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
  transferSessionCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Session storage keys
const SESSION_CART_KEY = 'handcrafted-haven-cart'

// Helper functions for session storage
const getSessionCart = (): Cart => {
  if (typeof window === 'undefined') return { items: [], total: 0, itemCount: 0 }
  
  try {
    const stored = sessionStorage.getItem(SESSION_CART_KEY)
    return stored ? JSON.parse(stored) : { items: [], total: 0, itemCount: 0 }
  } catch {
    return { items: [], total: 0, itemCount: 0 }
  }
}

const setSessionCart = (cart: Cart): void => {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(SESSION_CART_KEY, JSON.stringify(cart))
}

const clearSessionCart = (): void => {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(SESSION_CART_KEY)
}

const calculateCartTotals = (items: CartItem[]): { total: number; itemCount: number } => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchCart = async () => {
    if (!user) {
      // For non-logged-in users, use session storage
      const sessionCart = getSessionCart()
      setCart(sessionCart)
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          // Transform the API response to match our cart format
          const transformedCart: Cart = {
            items: data.data.items?.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: Number(item.price),
              product: {
                _id: item.product.id,
                name: item.product.name,
                price: Number(item.product.price),
                imageUrl: item.product.imageUrl,
                artisanName: item.product.artisan?.name || 'Unknown'
              }
            })) || [],
            total: Number(data.data.total || 0),
            itemCount: Number(data.data.itemCount || 0)
          }
          setCart(transformedCart)
        } else {
          setCart({ items: [], total: 0, itemCount: 0 })
        }
      } else {
        console.error('Cart fetch failed:', response.status)
        setCart({ items: [], total: 0, itemCount: 0 })
      }
    } catch (error) {
      console.error('Fetch cart error:', error)
      setCart({ items: [], total: 0, itemCount: 0 })
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId: string, quantity: number, product: any) => {
    if (!user) {
      // For non-logged-in users, use session storage
      const sessionCart = getSessionCart()
      const existingItemIndex = sessionCart.items.findIndex(
        item => item.productId === productId
      )

      if (existingItemIndex > -1) {
        sessionCart.items[existingItemIndex].quantity += quantity
      } else {
        sessionCart.items.push({
          productId,
          quantity,
          price: product.price,
          product: {
            _id: product._id || productId,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            artisanName: product.artisanName
          }
        })
      }

      const { total, itemCount } = calculateCartTotals(sessionCart.items)
      sessionCart.total = total
      sessionCart.itemCount = itemCount

      setSessionCart(sessionCart)
      setCart(sessionCart)
      return { success: true, message: 'Item added to cart' }
    }

    // For logged-in users, use API
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      })

      const data = await response.json()

      if (data.success && data.data) {
        // Transform the API response to match our cart format
        const transformedCart: Cart = {
          items: data.data.items?.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: Number(item.price),
            product: {
              _id: item.product.id,
              name: item.product.name,
              price: Number(item.product.price),
              imageUrl: item.product.imageUrl,
              artisanName: item.product.artisan?.name || 'Unknown'
            }
          })) || [],
          total: Number(data.data.total || 0),
          itemCount: Number(data.data.itemCount || 0)
        }
        setCart(transformedCart)
        return { success: true, message: 'Item added to cart' }
      } else {
        return { success: false, message: data.message || 'Failed to add item to cart' }
      }
    } catch (error) {
      console.error('Add to cart error:', error)
      return { success: false, message: 'Failed to add item to cart' }
    }
  }

  const updateCartItem = async (productId: string, quantity: number) => {
    if (!user) {
      // For non-logged-in users, use session storage
      const sessionCart = getSessionCart()
      const itemIndex = sessionCart.items.findIndex(
        item => item.productId === productId
      )

      if (itemIndex === -1) {
        return { success: false, message: 'Item not found in cart' }
      }

      sessionCart.items[itemIndex].quantity = quantity
      const { total, itemCount } = calculateCartTotals(sessionCart.items)
      sessionCart.total = total
      sessionCart.itemCount = itemCount

      setSessionCart(sessionCart)
      setCart(sessionCart)
      return { success: true, message: 'Cart updated' }
    }

    // For logged-in users, use API
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      })

      const data = await response.json()

      if (data.success) {
        setCart(data.data)
        return { success: true, message: 'Cart updated' }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error('Update cart error:', error)
      return { success: false, message: 'Failed to update cart' }
    }
  }

  const removeFromCart = async (productId: string) => {
    if (!user) {
      // For non-logged-in users, use session storage
      const sessionCart = getSessionCart()
      sessionCart.items = sessionCart.items.filter(
        item => item.productId !== productId
      )

      const { total, itemCount } = calculateCartTotals(sessionCart.items)
      sessionCart.total = total
      sessionCart.itemCount = itemCount

      setSessionCart(sessionCart)
      setCart(sessionCart)
      return { success: true, message: 'Item removed from cart' }
    }

    // For logged-in users, use API
    try {
      const response = await fetch(`/api/cart?productId=${productId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setCart(data.data)
        return { success: true, message: 'Item removed from cart' }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error('Remove from cart error:', error)
      return { success: false, message: 'Failed to remove item from cart' }
    }
  }

  const clearCart = async () => {
    if (!user) {
      clearSessionCart()
      setCart({ items: [], total: 0, itemCount: 0 })
      return
    }

    try {
      // Remove all items one by one for logged-in users
      if (cart?.items) {
        for (const item of cart.items) {
          await removeFromCart(item.productId)
        }
      }
    } catch (error) {
      console.error('Clear cart error:', error)
    }
  }

  const transferSessionCart = async () => {
    if (!user) return

    const sessionCart = getSessionCart()
    if (sessionCart.items.length === 0) return

    try {
      // Transfer each item from session storage to database
      for (const item of sessionCart.items) {
        await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            productId: item.productId, 
            quantity: item.quantity 
          }),
        })
      }

      // Clear session storage after successful transfer
      clearSessionCart()
      
      // Refresh cart to get updated data from database
      await refreshCart()
    } catch (error) {
      console.error('Transfer session cart error:', error)
    }
  }

  const refreshCart = async () => {
    await fetchCart()
  }

  useEffect(() => {
    fetchCart()
  }, [user])

  // Transfer session cart when user logs in
  useEffect(() => {
    if (user) {
      transferSessionCart()
    }
  }, [user])

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
    transferSessionCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 