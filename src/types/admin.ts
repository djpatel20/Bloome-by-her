export interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  totalRevenue: number
}

export interface SalesPoint {
  label: string
  value: number
}

export interface OrderStatusBreakdown {
  status: string
  count: number
}

export interface Banner {
  id: string
  title: string
  imageUrl: string
  linkUrl?: string
  isActive: boolean
  sortOrder: number
}

export interface Coupon {
  id: string
  code: string
  discountPercent: number
  isActive: boolean
  expiresAt?: string
}

export interface MediaAsset {
  id: string
  url: string
  fileName: string
  uploadedAt: string
}
