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
import { useCreateBanner, useUpdateBanner } from '@/hooks/useAdminBanners'
import type { Banner } from '@/types'

const bannerSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  imageUrl: z.string().url('Enter a valid image URL'),
  linkUrl: z.string().url('Enter a valid link').optional().or(z.literal('')),
})

type BannerFormValues = z.infer<typeof bannerSchema>

export function BannerFormDialog({
  open,
  onOpenChange,
  banner,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  banner?: Banner
}) {
  const createBanner = useCreateBanner()
  const updateBanner = useUpdateBanner()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BannerFormValues>({ resolver: zodResolver(bannerSchema) })

  useEffect(() => {
    if (open) {
      reset({
        title: banner?.title ?? '',
        imageUrl: banner?.imageUrl ?? '',
        linkUrl: banner?.linkUrl ?? '',
      })
    }
  }, [open, banner, reset])

  async function onSubmit(values: BannerFormValues) {
    if (banner) {
      await updateBanner.mutateAsync({ id: banner.id, payload: values })
      toast.success('Banner updated')
    } else {
      await createBanner.mutateAsync({ ...values, isActive: true, sortOrder: 0 })
      toast.success('Banner created')
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{banner ? 'Edit Banner' : 'Add Banner'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="banner-title">Title</FieldLabel>
            <Input id="banner-title" {...register('title')} />
            <FieldError errors={[errors.title]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="banner-image">Image URL</FieldLabel>
            <Input id="banner-image" {...register('imageUrl')} />
            <FieldError errors={[errors.imageUrl]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="banner-link">Link URL (optional)</FieldLabel>
            <Input id="banner-link" {...register('linkUrl')} />
            <FieldError errors={[errors.linkUrl]} />
          </Field>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {banner ? 'Save Changes' : 'Create Banner'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
