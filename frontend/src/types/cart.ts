import type { Product } from './product'

export interface CartItem {
  productId: string
  product: Product
  quantity: number
}

export interface WishlistItem {
  productId: string
  product: Product
}
