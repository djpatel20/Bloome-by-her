import { Helmet } from 'react-helmet-async'
import { StarRating } from '@/components/common/StarRating'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/utils/format'
import { useFeaturedReviews } from '@/hooks/useReviews'

export default function ReviewsPage() {
  const { data: reviews, isLoading, isError, refetch } = useFeaturedReviews()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <Helmet>
        <title>Customer Reviews — Bloome By Her</title>
      </Helmet>
      <h1 className="mb-6 font-heading text-3xl font-bold text-foreground">Customer Reviews</h1>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-3xl" />
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !reviews || reviews.length === 0 ? (
        <EmptyState title="No reviews yet" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">{review.customerName}</p>
                <span className="text-xs text-muted-foreground">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <StarRating rating={review.rating} />
              <p className="mt-2 text-sm text-muted-foreground">"{review.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
