import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminService } from '@/services/adminService'
import { queryKeys } from '@/constants/query-keys'
import type { Banner } from '@/types'

export function useAdminBanners() {
  return useQuery({
    queryKey: queryKeys.admin.banners.list,
    queryFn: adminService.banners.list,
  })
}

export function useCreateBanner() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Banner>) => adminService.banners.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.banners.list }),
  })
}

export function useUpdateBanner() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Banner> }) =>
      adminService.banners.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.banners.list }),
  })
}

export function useDeleteBanner() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.banners.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.banners.list }),
  })
}
