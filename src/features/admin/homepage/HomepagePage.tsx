import { Helmet } from 'react-helmet-async'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { useInstagramGallery } from '@/hooks/useHomepage'

export default function HomepagePage() {
  const { data: images, isLoading } = useInstagramGallery()

  return (
    <>
      <Helmet>
        <title>Homepage CMS — Admin — Bloome By Her</title>
      </Helmet>
      <h1 className="mb-2 font-heading text-2xl font-bold text-foreground">Homepage CMS</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Manage the Instagram Gallery section shown on the homepage.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square rounded-2xl" />
          ))}
        </div>
      ) : !images || images.length === 0 ? (
        <EmptyState
          title="No gallery images yet"
          description="Upload images from the Media Library."
        />
      ) : (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <img src={image.imageUrl} alt="Gallery" className="size-full object-cover" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 size-6 opacity-0 transition group-hover:opacity-100"
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
