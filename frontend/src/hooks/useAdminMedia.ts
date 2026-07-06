import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminService } from '@/services/adminService'
import { queryKeys } from '@/constants/query-keys'

export function useAdminMedia() {
  return useQuery({
    queryKey: queryKeys.admin.media.list,
    queryFn: adminService.media.list,
  })
}

export function useUploadMedia() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => adminService.media.upload(file),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.media.list }),
  })
}

export function useDeleteMedia() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminService.media.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.media.list }),
  })
}
