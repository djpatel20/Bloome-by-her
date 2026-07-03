import { Helmet } from 'react-helmet-async'
import { Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { StarRating } from '@/components/common/StarRating'
import { useAdminReviews, useSetReviewApproval } from '@/hooks/useAdminReviews'

export default function AdminReviewsPage() {
  const { data, isLoading, isError, refetch } = useAdminReviews()
  const setApproval = useSetReviewApproval()

  async function handleApproval(id: string, isApproved: boolean) {
    await setApproval.mutateAsync({ id, isApproved })
    toast.success(isApproved ? 'Review approved' : 'Review rejected')
  }

  return (
    <>
      <Helmet>
        <title>Reviews — Admin — Bloome By Her</title>
      </Helmet>
      <h1 className="mb-6 font-heading text-2xl font-bold text-foreground">Reviews</h1>

      <div className="rounded-3xl border border-border bg-card p-2">
        {isLoading ? (
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !data || data.items.length === 0 ? (
          <EmptyState title="No reviews yet" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-semibold text-foreground">
                    {review.customerName}
                  </TableCell>
                  <TableCell>
                    <StarRating rating={review.rating} />
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                  <TableCell>
                    <Badge variant={review.isApproved ? 'secondary' : 'outline'}>
                      {review.isApproved ? 'Approved' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary"
                      onClick={() => handleApproval(review.id, true)}
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleApproval(review.id, false)}
                    >
                      <X className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}
