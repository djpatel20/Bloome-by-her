import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, WishlistItem } from '@/types'

interface WishlistState {
  items: WishlistItem[]
  toggle: (product: Product) => void
  has: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.productId === product.id)
          if (exists) {
            return { items: state.items.filter((item) => item.productId !== product.id) }
          }
          return { items: [...state.items, { productId: product.id, product }] }
        }),
      has: (productId) => get().items.some((item) => item.productId === productId),
    }),
    { name: 'bbh-wishlist' },
  ),
)
