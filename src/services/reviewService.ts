import { apiClient } from './apiClient'
import type { CreateReviewPayload, PaginatedResult, Review } from '@/types'

export const reviewService = {
  byProduct: async (productId: string): Promise<Review[]> => {
    const { data } = await apiClient.get<Review[]>(`/products/${productId}/reviews`)
    return data
  },
  featured: async (): Promise<Review[]> => {
    const { data } = await apiClient.get<Review[]>('/reviews/featured')
    return data
  },
  create: async (payload: CreateReviewPayload): Promise<Review> => {
    const { data } = await apiClient.post<Review>('/reviews', payload)
    return data
  },
  adminList: async (params?: Record<string, unknown>): Promise<PaginatedResult<Review>> => {
    const { data } = await apiClient.get<PaginatedResult<Review>>('/admin/reviews', { params })
    return data
  },
  adminSetApproval: async (id: string, isApproved: boolean): Promise<Review> => {
    const { data } = await apiClient.patch<Review>(`/admin/reviews/${id}`, { isApproved })
    return data
  },
}
