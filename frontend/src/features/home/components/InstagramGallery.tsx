import { Camera } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Skeleton } from '@/components/ui/skeleton'
import { useInstagramGallery } from '@/hooks/useHomepage'

export function InstagramGallery() {
  const { data: images, isLoading, isError } = useInstagramGallery()

  if (isError) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <SectionHeading title="Instagram Gallery" />
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-2xl" />
            ))
          : images?.map((image) => (
              <a
                key={image.id}
                href={image.postUrl ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl"
              >
                <img
                  src={image.imageUrl}
                  alt="Instagram post"
                  loading="lazy"
                  className="size-full object-cover transition group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                  <Camera className="size-5 text-white opacity-0 transition group-hover:opacity-100" />
                </div>
              </a>
            ))}
      </div>
    </section>
  )
}
