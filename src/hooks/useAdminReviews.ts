import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '@/services/reviewService'
import { queryKeys } from '@/constants/query-keys'

export function useAdminReviews(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.admin.reviews.list(params),
    queryFn: () => reviewService.adminList(params),
  })
}

export function useSetReviewApproval() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, isApproved }: { id: string; isApproved: boolean }) =>
      reviewService.adminSetApproval(id, isApproved),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.admin.reviews.list() }),
  })
}
