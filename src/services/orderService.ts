import { apiClient } from './apiClient'
import type { CreateOrderPayload, Order, PaginatedResult } from '@/types'

export const orderService = {
  myOrders: async (): Promise<Order[]> => {
    const { data } = await apiClient.get<Order[]>('/orders/mine')
    return data
  },
  byId: async (id: string): Promise<Order> => {
    const { data } = await apiClient.get<Order>(`/orders/${id}`)
    return data
  },
  create: async (payload: CreateOrderPayload): Promise<Order> => {
    const { data } = await apiClient.post<Order>('/orders', payload)
    return data
  },
  adminList: async (params?: Record<string, unknown>): Promise<PaginatedResult<Order>> => {
    const { data } = await apiClient.get<PaginatedResult<Order>>('/admin/orders', { params })
    return data
  },
  adminUpdateStatus: async (id: string, status: Order['status']): Promise<Order> => {
    const { data } = await apiClient.patch<Order>(`/admin/orders/${id}/status`, { status })
    return data
  },
}
