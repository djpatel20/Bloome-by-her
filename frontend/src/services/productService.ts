import { apiClient } from './apiClient'
import type { PaginatedResult, Product, ProductFilters } from '@/types'

export const productService = {
  list: async (filters: ProductFilters = {}): Promise<PaginatedResult<Product>> => {
    const { data } = await apiClient.get<PaginatedResult<Product>>('/products', {
      params: filters,
    })
    return data
  },
  bySlug: async (slug: string): Promise<Product> => {
    const { data } = await apiClient.get<Product>(`/products/${slug}`)
    return data
  },
  bestSellers: async (): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>('/products/best-sellers')
    return data
  },
}
