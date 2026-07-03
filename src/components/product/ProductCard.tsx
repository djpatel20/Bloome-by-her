import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { StarRating } from '@/components/common/StarRating'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { formatCurrency } from '@/utils/format'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)
  const toggleWishlist = useWishlistStore((state) => state.toggle)
  const isWishlisted = useWishlistStore((state) => state.has(product.id))
  const image = product.images[0]

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-sm transition hover:shadow-lg">
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label="Toggle wishlist"
        className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-background/90 shadow-sm"
      >
        <Heart
          className={cn(
            'size-4',
            isWishlisted ? 'fill-primary text-primary' : 'text-foreground/60',
          )}
        />
      </button>

      <Link
        to={ROUTES.product(product.slug)}
        className="block overflow-hidden rounded-2xl bg-brand-blush"
      >
        <img
          src={image?.url}
          alt={image?.alt ?? product.name}
          loading="lazy"
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1 px-1 pt-3">
        <Link
          to={ROUTES.product(product.slug)}
          className="font-heading text-sm font-bold text-foreground"
        >
          {product.name}
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-1 flex items-center gap-2">
          <span className="text-base font-bold text-foreground">
            {formatCurrency(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      <Button
        size="sm"
        className="mt-3 w-full rounded-full"
        onClick={() => {
          addItem(product)
          toast.success(`${product.name} added to cart`)
        }}
      >
        Add to Cart
      </Button>
    </div>
  )
}
