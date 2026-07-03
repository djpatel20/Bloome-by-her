import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminService } from '@/services/adminService'
import { queryKeys } from '@/constants/query-keys'
import type { Category } from '@/types'

export function useAdminCategories() {
  return useQuery({
    queryKey: queryKeys.admin.categories.list,
    queryFn: adminService.categories.list,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Category>) => adminService.categories.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.categories.list }),
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Category> }) =>
      adminService.categories.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.categories.list }),
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.categories.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.categories.list }),
  })
}
