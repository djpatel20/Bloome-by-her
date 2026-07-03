import { apiClient } from './apiClient'
import type { Category } from '@/types'

export const categoryService = {
  list: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>('/categories')
    return data
  },
}
