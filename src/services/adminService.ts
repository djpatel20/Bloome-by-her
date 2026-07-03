import { apiClient } from './apiClient'
import type {
  Banner,
  Category,
  Coupon,
  DashboardStats,
  MediaAsset,
  OrderStatusBreakdown,
  PaginatedResult,
  Product,
  SalesPoint,
} from '@/types'

export const adminService = {
  dashboardStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get<DashboardStats>('/admin/dashboard/stats')
    return data
  },
  salesOverview: async (): Promise<SalesPoint[]> => {
    const { data } = await apiClient.get<SalesPoint[]>('/admin/dashboard/sales-overview')
    return data
  },
  orderStatusBreakdown: async (): Promise<OrderStatusBreakdown[]> => {
    const { data } = await apiClient.get<OrderStatusBreakdown[]>('/admin/dashboard/order-status')
    return data
  },
  topProducts: async (): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>('/admin/dashboard/top-products')
    return data
  },

  products: {
    list: async (params?: Record<string, unknown>): Promise<PaginatedResult<Product>> => {
      const { data } = await apiClient.get<PaginatedResult<Product>>('/admin/products', {
        params,
      })
      return data
    },
    create: async (payload: Partial<Product>): Promise<Product> => {
      const { data } = await apiClient.post<Product>('/admin/products', payload)
      return data
    },
    update: async (id: string, payload: Partial<Product>): Promise<Product> => {
      const { data } = await apiClient.patch<Product>(`/admin/products/${id}`, payload)
      return data
    },
    remove: async (id: string): Promise<void> => {
      await apiClient.delete(`/admin/products/${id}`)
    },
  },

  categories: {
    list: async (): Promise<Category[]> => {
      const { data } = await apiClient.get<Category[]>('/admin/categories')
      return data
    },
    create: async (payload: Partial<Category>): Promise<Category> => {
      const { data } = await apiClient.post<Category>('/admin/categories', payload)
      return data
    },
    update: async (id: string, payload: Partial<Category>): Promise<Category> => {
      const { data } = await apiClient.patch<Category>(`/admin/categories/${id}`, payload)
      return data
    },
    remove: async (id: string): Promise<void> => {
      await apiClient.delete(`/admin/categories/${id}`)
    },
  },

  banners: {
    list: async (): Promise<Banner[]> => {
      const { data } = await apiClient.get<Banner[]>('/admin/banners')
      return data
    },
    create: async (payload: Partial<Banner>): Promise<Banner> => {
      const { data } = await apiClient.post<Banner>('/admin/banners', payload)
      return data
    },
    update: async (id: string, payload: Partial<Banner>): Promise<Banner> => {
      const { data } = await apiClient.patch<Banner>(`/admin/banners/${id}`, payload)
      return data
    },
    remove: async (id: string): Promise<void> => {
      await apiClient.delete(`/admin/banners/${id}`)
    },
  },

  coupons: {
    list: async (): Promise<Coupon[]> => {
      const { data } = await apiClient.get<Coupon[]>('/admin/coupons')
      return data
    },
    create: async (payload: Partial<Coupon>): Promise<Coupon> => {
      const { data } = await apiClient.post<Coupon>('/admin/coupons', payload)
      return data
    },
    update: async (id: string, payload: Partial<Coupon>): Promise<Coupon> => {
      const { data } = await apiClient.patch<Coupon>(`/admin/coupons/${id}`, payload)
      return data
    },
    remove: async (id: string): Promise<void> => {
      await apiClient.delete(`/admin/coupons/${id}`)
    },
  },

  media: {
    list: async (): Promise<MediaAsset[]> => {
      const { data } = await apiClient.get<MediaAsset[]>('/admin/media')
      return data
    },
    upload: async (file: File): Promise<MediaAsset> => {
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await apiClient.post<MediaAsset>('/admin/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data
    },
    remove: async (id: string): Promise<void> => {
      await apiClient.delete(`/admin/media/${id}`)
    },
  },
}
