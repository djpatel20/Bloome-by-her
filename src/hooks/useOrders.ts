import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'
import { queryKeys } from '@/constants/query-keys'

export function useMyOrders() {
  return useQuery({
    queryKey: queryKeys.orders.mine,
    queryFn: orderService.myOrders,
  })
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => orderService.byId(id),
    enabled: Boolean(id),
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: orderService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.mine })
    },
  })
}
