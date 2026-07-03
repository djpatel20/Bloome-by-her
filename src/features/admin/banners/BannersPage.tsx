import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
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
import { BannerFormDialog } from './components/BannerFormDialog'
import { useAdminBanners, useDeleteBanner, useUpdateBanner } from '@/hooks/useAdminBanners'
import type { Banner } from '@/types'

export default function BannersPage() {
  const { data: banners, isLoading } = useAdminBanners()
  const updateBanner = useUpdateBanner()
  const deleteBanner = useDeleteBanner()
  const [editingBanner, setEditingBanner] = useState<Banner | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function openCreate() {
    setEditingBanner(undefined)
    setIsFormOpen(true)
  }

  async function confirmDelete() {
    if (!deletingId) return
    await deleteBanner.mutateAsync(deletingId)
    toast.success('Banner deleted')
    setDeletingId(null)
  }

  return (
    <>
      <Helmet>
        <title>Banners — Admin — Bloome By Her</title>
      </Helmet>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">Banners</h1>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Add Banner
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-48 rounded-3xl" />
          ))}
        </div>
      ) : !banners || banners.length === 0 ? (
        <EmptyState title="No banners yet" actionLabel="Add Banner" onAction={openCreate} />
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="overflow-hidden rounded-3xl border border-border bg-card"
            >
              <img src={banner.imageUrl} alt={banner.title} className="h-32 w-full object-cover" />
              <div className="flex items-center justify-between p-4">
                <span className="text-sm font-semibold text-foreground">{banner.title}</span>
                <Switch
                  checked={banner.isActive}
                  onCheckedChange={(checked) =>
                    updateBanner.mutate({ id: banner.id, payload: { isActive: checked } })
                  }
                />
              </div>
              <div className="flex justify-end gap-1 border-t border-border p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingBanner(banner)
                    setIsFormOpen(true)
                  }}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => setDeletingId(banner.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <BannerFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} banner={editingBanner} />

      <AlertDialog open={Boolean(deletingId)} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this banner?</AlertDialogTitle>
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
