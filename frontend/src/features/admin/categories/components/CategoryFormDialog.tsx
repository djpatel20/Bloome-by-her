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
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { useCreateCategory, useUpdateCategory } from '@/hooks/useAdminCategories'
import type { Category } from '@/types'

const categorySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  imageUrl: z.string().url('Enter a valid image URL'),
})

type CategoryFormValues = z.infer<typeof categorySchema>

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category
}) {
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({ resolver: zodResolver(categorySchema) })

  useEffect(() => {
    if (open) {
      reset({ name: category?.name ?? '', imageUrl: category?.imageUrl ?? '' })
    }
  }, [open, category, reset])

  async function onSubmit(values: CategoryFormValues) {
    if (category) {
      await updateCategory.mutateAsync({ id: category.id, payload: values })
      toast.success('Category updated')
    } else {
      await createCategory.mutateAsync(values)
      toast.success('Category created')
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add Category'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="cat-name">Name</FieldLabel>
            <Input id="cat-name" {...register('name')} />
            <FieldError errors={[errors.name]} />
          </Field>
          <ImageUploadField
            id="cat-image"
            label="Image"
            value={watch('imageUrl') ?? ''}
            onChange={(url) => setValue('imageUrl', url, { shouldValidate: true })}
            error={errors.imageUrl}
          />
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {category ? 'Save Changes' : 'Create Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
