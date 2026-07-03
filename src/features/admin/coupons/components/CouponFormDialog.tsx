import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreateCoupon, useUpdateCoupon } from '@/hooks/useAdminCoupons'
import type { Coupon } from '@/types'

const couponSchema = z.object({
  code: z.string().min(3, 'Code is required').toUpperCase(),
  discountPercent: z.coerce.number().min(1).max(100),
  expiresAt: z.string().optional(),
})

type CouponFormInput = z.input<typeof couponSchema>
type CouponFormValues = z.output<typeof couponSchema>

export function CouponFormDialog({
  open,
  onOpenChange,
  coupon,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  coupon?: Coupon
}) {
  const createCoupon = useCreateCoupon()
  const updateCoupon = useUpdateCoupon()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormInput, unknown, CouponFormValues>({
    resolver: zodResolver(couponSchema),
  })

  useEffect(() => {
    if (open) {
      reset({
        code: coupon?.code ?? '',
        discountPercent: coupon?.discountPercent ?? 10,
        expiresAt: coupon?.expiresAt?.slice(0, 10) ?? '',
      })
    }
  }, [open, coupon, reset])

  async function onSubmit(values: CouponFormValues) {
    if (coupon) {
      await updateCoupon.mutateAsync({ id: coupon.id, payload: values })
      toast.success('Coupon updated')
    } else {
      await createCoupon.mutateAsync({ ...values, isActive: true })
      toast.success('Coupon created')
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{coupon ? 'Edit Coupon' : 'Add Coupon'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="coupon-code">Code</FieldLabel>
            <Input id="coupon-code" {...register('code')} />
            <FieldError errors={[errors.code]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="coupon-discount">Discount (%)</FieldLabel>
            <Input id="coupon-discount" type="number" {...register('discountPercent')} />
            <FieldError errors={[errors.discountPercent]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="coupon-expiry">Expires On (optional)</FieldLabel>
            <Input id="coupon-expiry" type="date" {...register('expiresAt')} />
          </Field>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {coupon ? 'Save Changes' : 'Create Coupon'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
