import { apiClient } from './apiClient'
import type { Address, PaginatedResult, User } from '@/types'

export const customerService = {
  adminList: async (params?: Record<string, unknown>): Promise<PaginatedResult<User>> => {
    const { data } = await apiClient.get<PaginatedResult<User>>('/admin/customers', { params })
    return data
  },
  updateProfile: async (payload: Partial<User>): Promise<User> => {
    const { data } = await apiClient.patch<User>('/customers/me', payload)
    return data
  },
  addresses: async (): Promise<Address[]> => {
    const { data } = await apiClient.get<Address[]>('/customers/me/addresses')
    return data
  },
  saveAddress: async (payload: Omit<Address, 'id'> & { id?: string }): Promise<Address> => {
    const { data } = await apiClient.post<Address>('/customers/me/addresses', payload)
    return data
  },
}
