import { useQuery } from '@tanstack/react-query'
import { adminService } from '@/services/adminService'
import { queryKeys } from '@/constants/query-keys'

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.admin.dashboard,
    queryFn: adminService.dashboardStats,
  })
}

export function useSalesOverview() {
  return useQuery({
    queryKey: [...queryKeys.admin.dashboard, 'sales-overview'],
    queryFn: adminService.salesOverview,
  })
}

export function useOrderStatusBreakdown() {
  return useQuery({
    queryKey: [...queryKeys.admin.dashboard, 'order-status'],
    queryFn: adminService.orderStatusBreakdown,
  })
}

export function useTopProducts() {
  return useQuery({
    queryKey: [...queryKeys.admin.dashboard, 'top-products'],
    queryFn: adminService.topProducts,
  })
}
