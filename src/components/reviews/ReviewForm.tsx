import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import { useCreateReview } from '@/hooks/useReviews'

const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  title: z.string().min(3, 'Title is too short').max(80),
  comment: z.string().min(10, 'Please write at least 10 characters').max(1000),
})

type ReviewFormValues = z.infer<typeof reviewSchema>

export function ReviewForm({ productId }: { productId: string }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, title: '', comment: '' },
  })
  const createReview = useCreateReview(productId)
  const rating = watch('rating')

  async function onSubmit(values: ReviewFormValues) {
    await createReview.mutateAsync({ productId, ...values })
    toast.success('Thanks for your review!')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field>
        <FieldLabel>Your Rating</FieldLabel>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setValue('rating', index + 1, { shouldValidate: true })}
              aria-label={`Rate ${index + 1} stars`}
            >
              <Star
                className={cn(
                  'size-6',
                  index < rating ? 'fill-primary text-primary' : 'text-muted-foreground',
                )}
              />
            </button>
          ))}
        </div>
        <FieldError errors={[errors.rating]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="review-title">Title</FieldLabel>
        <Input id="review-title" placeholder="Summarize your experience" {...register('title')} />
        <FieldError errors={[errors.title]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="review-comment">Comment</FieldLabel>
        <Textarea
          id="review-comment"
          placeholder="Tell us more..."
          rows={4}
          {...register('comment')}
        />
        <FieldError errors={[errors.comment]} />
      </Field>

      <Button type="submit" className="rounded-full" disabled={isSubmitting}>
        Submit Review
      </Button>
    </form>
  )
}
