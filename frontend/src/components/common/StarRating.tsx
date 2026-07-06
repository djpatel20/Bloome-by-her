import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
  rating,
  reviewCount,
  size = 'sm',
}: {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md'
}) {
  const starSize = size === 'sm' ? 'size-3.5' : 'size-4'

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              starSize,
              index < Math.round(rating) ? 'fill-primary text-primary' : 'fill-muted text-muted',
            )}
          />
        ))}
      </div>
      {typeof reviewCount === 'number' && (
        <span className="text-xs text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  )
}
