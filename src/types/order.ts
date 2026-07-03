import type { Address } from './user'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentMethod = 'cod' | 'upi' | 'card' | 'netbanking'

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  shippingAddress: Address
  createdAt: string
}

export interface CreateOrderPayload {
  items: { productId: string; quantity: number }[]
  shippingAddress: Address
  paymentMethod: PaymentMethod
}
