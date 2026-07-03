import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Trash2, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { useAdminMedia, useDeleteMedia, useUploadMedia } from '@/hooks/useAdminMedia'

export default function MediaPage() {
  const { data: media, isLoading } = useAdminMedia()
  const uploadMedia = useUploadMedia()
  const deleteMedia = useDeleteMedia()
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    await uploadMedia.mutateAsync(file)
    toast.success('File uploaded')
    event.target.value = ''
  }

  return (
    <>
      <Helmet>
        <title>Media Library — Admin — Bloome By Her</title>
      </Helmet>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">Media Library</h1>
        <Button onClick={() => fileInputRef.current?.click()}>
          <Upload className="size-4" />
          Upload
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square rounded-2xl" />
          ))}
        </div>
      ) : !media || media.length === 0 ? (
        <EmptyState
          title="No media uploaded yet"
          actionLabel="Upload"
          onAction={() => fileInputRef.current?.click()}
        />
      ) : (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {media.map((asset) => (
            <div
              key={asset.id}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border"
            >
              <img src={asset.url} alt={asset.fileName} className="size-full object-cover" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 size-6 opacity-0 transition group-hover:opacity-100"
                onClick={() => deleteMedia.mutate(asset.id)}
              >
                <Trash2 className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
