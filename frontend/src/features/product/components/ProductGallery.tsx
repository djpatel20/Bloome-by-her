import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/types'

export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[]
  productName: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-3xl bg-brand-blush">
        <img
          src={activeImage?.url}
          alt={activeImage?.alt ?? productName}
          className="size-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                'size-16 overflow-hidden rounded-xl border-2 transition',
                index === activeIndex ? 'border-primary' : 'border-transparent',
              )}
            >
              <img src={image.url} alt={image.alt} className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
