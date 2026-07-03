export interface Review {
  id: string
  productId: string
  customerId: string
  customerName: string
  customerAvatarUrl?: string
  rating: number
  title: string
  comment: string
  createdAt: string
  isApproved: boolean
}

export interface CreateReviewPayload {
  productId: string
  rating: number
  title: string
  comment: string
}
