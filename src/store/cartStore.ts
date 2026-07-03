import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
  subtotal: () => number
  totalQuantity: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            }
          }
          return { items: [...state.items, { productId: product.id, product, quantity }] }
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
          ),
        })),
      clear: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      totalQuantity: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'bbh-cart' },
  ),
)
