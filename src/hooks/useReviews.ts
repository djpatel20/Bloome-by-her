import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '@/services/reviewService'
import { queryKeys } from '@/constants/query-keys'

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: queryKeys.reviews.byProduct(productId),
    queryFn: () => reviewService.byProduct(productId),
    enabled: Boolean(productId),
  })
}

export function useFeaturedReviews() {
  return useQuery({
    queryKey: queryKeys.reviews.featured,
    queryFn: reviewService.featured,
  })
}

export function useCreateReview(productId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: reviewService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.byProduct(productId) })
    },
  })
}
