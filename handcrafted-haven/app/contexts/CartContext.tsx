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
  addToCart: (productId: string, quantity: number) => Promise<{ success: boolean; message: string }>
  updateCartItem: (productId: string, quantity: number) => Promise<{ success: boolean; message: string }>
  removeFromCart: (productId: string) => Promise<{ success: boolean; message: string }>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchCart = async () => {
    if (!user) {
      setCart(null)
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        setCart(data.data)
      } else {
        setCart(null)
      }
    } catch (error) {
      console.error('Fetch cart error:', error)
      setCart(null)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId: string, quantity: number) => {
    if (!user) {
      return { success: false, message: 'Please login to add items to cart' }
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      })

      const data = await response.json()

      if (data.success) {
        setCart(data.data)
        return { success: true, message: 'Item added to cart' }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error('Add to cart error:', error)
      return { success: false, message: 'Failed to add item to cart' }
    }
  }

  const updateCartItem = async (productId: string, quantity: number) => {
    if (!user) {
      return { success: false, message: 'Please login to update cart' }
    }

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
      return { success: false, message: 'Please login to remove items from cart' }
    }

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
    if (!user) return

    try {
      // Remove all items one by one
      if (cart?.items) {
        for (const item of cart.items) {
          await removeFromCart(item.productId)
        }
      }
    } catch (error) {
      console.error('Clear cart error:', error)
    }
  }

  const refreshCart = async () => {
    await fetchCart()
  }

  useEffect(() => {
    fetchCart()
  }, [user])

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
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