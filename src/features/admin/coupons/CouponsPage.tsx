import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { CouponFormDialog } from './components/CouponFormDialog'
import { formatDate } from '@/utils/format'
import { useAdminCoupons, useDeleteCoupon } from '@/hooks/useAdminCoupons'
import type { Coupon } from '@/types'

export default function CouponsPage() {
  const { data: coupons, isLoading } = useAdminCoupons()
  const deleteCoupon = useDeleteCoupon()
  const [editingCoupon, setEditingCoupon] = useState<Coupon | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function openCreate() {
    setEditingCoupon(undefined)
    setIsFormOpen(true)
  }

  async function confirmDelete() {
    if (!deletingId) return
    await deleteCoupon.mutateAsync(deletingId)
    toast.success('Coupon deleted')
    setDeletingId(null)
  }

  return (
    <>
      <Helmet>
        <title>Coupons — Admin — Bloome By Her</title>
      </Helmet>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">Coupons</h1>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Add Coupon
        </Button>
      </div>

      <div className="rounded-3xl border border-border bg-card p-2">
        {isLoading ? (
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : !coupons || coupons.length === 0 ? (
          <EmptyState title="No coupons yet" actionLabel="Add Coupon" onAction={openCreate} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-mono font-semibold text-foreground">
                    {coupon.code}
                  </TableCell>
                  <TableCell>{coupon.discountPercent}%</TableCell>
                  <TableCell>{coupon.expiresAt ? formatDate(coupon.expiresAt) : '—'}</TableCell>
                  <TableCell>
                    <Badge variant={coupon.isActive ? 'secondary' : 'outline'}>
                      {coupon.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingCoupon(coupon)
                        setIsFormOpen(true)
                      }}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => setDeletingId(coupon.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <CouponFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} coupon={editingCoupon} />

      <AlertDialog open={Boolean(deletingId)} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this coupon?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
