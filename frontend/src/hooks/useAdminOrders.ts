import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'
import { queryKeys } from '@/constants/query-keys'
import type { Order } from '@/types'

export function useAdminOrders(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.orders.admin.list(params),
    queryFn: () => orderService.adminList(params),
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Order['status'] }) =>
      orderService.adminUpdateStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.orders.admin.list() }),
  })
}
