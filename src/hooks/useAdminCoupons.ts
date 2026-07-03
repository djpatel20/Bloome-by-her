import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminService } from '@/services/adminService'
import { queryKeys } from '@/constants/query-keys'
import type { Coupon } from '@/types'

export function useAdminCoupons() {
  return useQuery({
    queryKey: queryKeys.admin.coupons.list,
    queryFn: adminService.coupons.list,
  })
}

export function useCreateCoupon() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Coupon>) => adminService.coupons.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.coupons.list }),
  })
}

export function useUpdateCoupon() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Coupon> }) =>
      adminService.coupons.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.coupons.list }),
  })
}

export function useDeleteCoupon() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.coupons.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.coupons.list }),
  })
}
