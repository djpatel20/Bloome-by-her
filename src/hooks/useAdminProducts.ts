import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminService } from '@/services/adminService'
import { queryKeys } from '@/constants/query-keys'
import type { Product } from '@/types'

export function useAdminProducts(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.admin.products.list(params),
    queryFn: () => adminService.products.list(params),
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Product>) => adminService.products.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.products.list() }),
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Product> }) =>
      adminService.products.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.products.list() }),
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.products.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.products.list() }),
  })
}
