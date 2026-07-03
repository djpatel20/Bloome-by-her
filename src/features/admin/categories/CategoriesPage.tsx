import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
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
import { CategoryFormDialog } from './components/CategoryFormDialog'
import { useAdminCategories, useDeleteCategory } from '@/hooks/useAdminCategories'
import type { Category } from '@/types'

export default function CategoriesPage() {
  const { data: categories, isLoading } = useAdminCategories()
  const deleteCategory = useDeleteCategory()
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function openCreate() {
    setEditingCategory(undefined)
    setIsFormOpen(true)
  }

  async function confirmDelete() {
    if (!deletingId) return
    await deleteCategory.mutateAsync(deletingId)
    toast.success('Category deleted')
    setDeletingId(null)
  }

  return (
    <>
      <Helmet>
        <title>Categories — Admin — Bloome By Her</title>
      </Helmet>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">Categories</h1>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Add Category
        </Button>
      </div>

      <div className="rounded-3xl border border-border bg-card p-2">
        {isLoading ? (
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : !categories || categories.length === 0 ? (
          <EmptyState title="No categories yet" actionLabel="Add Category" onAction={openCreate} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="flex items-center gap-3">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="size-10 rounded-xl bg-brand-blush object-cover"
                    />
                    <span className="font-semibold text-foreground">{category.name}</span>
                  </TableCell>
                  <TableCell>{category.productCount}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingCategory(category)
                        setIsFormOpen(true)
                      }}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => setDeletingId(category.id)}
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

      <CategoryFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={editingCategory}
      />

      <AlertDialog open={Boolean(deletingId)} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this category?</AlertDialogTitle>
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
