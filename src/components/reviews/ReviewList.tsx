import { StarRating } from '@/components/common/StarRating'
import { EmptyState } from '@/components/common/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/utils/format'
import type { Review } from '@/types'

export function ReviewList({ reviews, isLoading }: { reviews: Review[]; isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-2xl" />
        ))}
      </div>
    )
  }

  if (reviews.length === 0) {
    return <EmptyState title="No reviews yet" description="Be the first to share your thoughts." />
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-foreground">{review.customerName}</p>
              <StarRating rating={review.rating} />
            </div>
            <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
          </div>
          <p className="mt-2 text-sm font-semibold text-foreground">{review.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
