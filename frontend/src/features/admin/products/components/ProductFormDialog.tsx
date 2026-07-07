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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { useAdminCategories } from '@/hooks/useAdminCategories'
import { useCreateProduct, useUpdateProduct } from '@/hooks/useAdminProducts'
import type { Product } from '@/types'

const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  categoryId: z.string().min(1, 'Category is required'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  stock: z.coerce.number().min(0, 'Stock cannot be negative'),
  description: z.string().min(10, 'Description is too short'),
  imageUrl: z.string().url('Enter a valid image URL'),
})

type ProductFormInput = z.input<typeof productSchema>
type ProductFormValues = z.output<typeof productSchema>

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product
}) {
  const { data: categories } = useAdminCategories()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
  })

  useEffect(() => {
    if (open) {
      reset({
        name: product?.name ?? '',
        categoryId: product?.categoryId ?? '',
        price: product?.price ?? 0,
        stock: product?.stock ?? 0,
        description: product?.description ?? '',
        imageUrl: product?.images[0]?.url ?? '',
      })
    }
  }, [open, product, reset])

  async function onSubmit(values: ProductFormValues) {
    const payload: Partial<Product> = {
      name: values.name,
      categoryId: values.categoryId,
      price: values.price,
      stock: values.stock,
      description: values.description,
      images: [{ id: 'img-1', url: values.imageUrl, alt: values.name }],
    }

    if (product) {
      await updateProduct.mutateAsync({ id: product.id, payload })
      toast.success('Product updated')
    } else {
      await createProduct.mutateAsync(payload)
      toast.success('Product created')
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" {...register('name')} />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select
              value={watch('categoryId')}
              onValueChange={(value) =>
                setValue('categoryId', value ?? '', { shouldValidate: true })
              }
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={[errors.categoryId]} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="price">Price (₹)</FieldLabel>
              <Input id="price" type="number" step="0.01" {...register('price')} />
              <FieldError errors={[errors.price]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="stock">Stock</FieldLabel>
              <Input id="stock" type="number" {...register('stock')} />
              <FieldError errors={[errors.stock]} />
            </Field>
          </div>

          <ImageUploadField
            id="imageUrl"
            value={watch('imageUrl') ?? ''}
            onChange={(url) => setValue('imageUrl', url, { shouldValidate: true })}
            error={errors.imageUrl}
          />

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea id="description" rows={3} {...register('description')} />
            <FieldError errors={[errors.description]} />
          </Field>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {product ? 'Save Changes' : 'Create Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
