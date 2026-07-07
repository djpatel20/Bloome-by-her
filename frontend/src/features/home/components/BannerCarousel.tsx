import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { useBanners } from '@/hooks/useHomepage'

const AUTO_ADVANCE_MS = 5000

export function BannerCarousel() {
  const { data: banners, isLoading, isError } = useBanners()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!banners || banners.length < 2) return
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % banners.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [banners])

  if (isError) return null

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <Skeleton className="aspect-[21/9] w-full rounded-2xl" />
      </div>
    )
  }

  if (!banners || banners.length === 0) return null

  const activeBanner = banners[activeIndex % banners.length]!

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-muted">
        <AnimatePresence mode="wait">
          <motion.a
            key={activeBanner.id}
            href={activeBanner.linkUrl || undefined}
            className="absolute inset-0 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={activeBanner.imageUrl}
              alt={activeBanner.title}
              className="size-full object-cover"
            />
          </motion.a>
        </AnimatePresence>

        {banners.length > 1 ? (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                aria-label={`Show banner ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/60'
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
