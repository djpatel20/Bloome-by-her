import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/common/SectionHeading'
import { StarRating } from '@/components/common/StarRating'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useFeaturedReviews } from '@/hooks/useReviews'

export function TestimonialsSection() {
  const { data: reviews, isLoading, isError } = useFeaturedReviews()

  if (isError) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <SectionHeading
        title="Customer Reviews"
        action={<Button variant="ghost" size="sm" render={<Link to="/reviews">View All</Link>} />}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-40 rounded-3xl" />
            ))
          : reviews?.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-5"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      review.customerAvatarUrl ??
                      `https://api.dicebear.com/9.x/notionists/svg?seed=${review.customerName}`
                    }
                    alt={review.customerName}
                    className="size-10 rounded-full bg-accent"
                  />
                  <div>
                    <p className="text-sm font-bold text-foreground">{review.customerName}</p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">"{review.comment}"</p>
              </div>
            ))}
      </div>
    </section>
  )
}
