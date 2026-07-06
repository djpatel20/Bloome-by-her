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
import { ErrorState } from '@/components/common/ErrorState'
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
import { ProductFormDialog } from './components/ProductFormDialog'
import { formatCurrency } from '@/utils/format'
import { useAdminProducts, useDeleteProduct } from '@/hooks/useAdminProducts'
import type { Product } from '@/types'

export default function ProductsPage() {
  const { data, isLoading, isError, refetch } = useAdminProducts()
  const deleteProduct = useDeleteProduct()
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function openCreate() {
    setEditingProduct(undefined)
    setIsFormOpen(true)
  }

  function openEdit(product: Product) {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  async function confirmDelete() {
    if (!deletingId) return
    await deleteProduct.mutateAsync(deletingId)
    toast.success('Product deleted')
    setDeletingId(null)
  }

  return (
    <>
      <Helmet>
        <title>Products — Admin — Bloome By Her</title>
      </Helmet>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">Products</h1>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>

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
          <EmptyState title="No products yet" actionLabel="Add Product" onAction={openCreate} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="flex items-center gap-3">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="size-10 rounded-xl bg-brand-blush object-cover"
                    />
                    <span className="font-semibold text-foreground">{product.name}</span>
                  </TableCell>
                  <TableCell>{product.categoryName}</TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell>
                    <Badge variant={product.stock > 0 ? 'secondary' : 'destructive'}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(product)}>
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => setDeletingId(product.id)}
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

      <ProductFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} product={editingProduct} />

      <AlertDialog open={Boolean(deletingId)} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
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
