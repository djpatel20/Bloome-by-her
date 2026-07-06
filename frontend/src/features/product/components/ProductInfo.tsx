import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Minus, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { StarRating } from '@/components/common/StarRating'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { formatCurrency } from '@/utils/format'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)
  const toggleWishlist = useWishlistStore((state) => state.toggle)
  const isWishlisted = useWishlistStore((state) => state.has(product.id))
  const navigate = useNavigate()

  function handleAddToCart() {
    addItem(product, quantity)
    toast.success(`${product.name} added to cart`)
  }

  function handleBuyNow() {
    addItem(product, quantity)
    navigate(ROUTES.checkout)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold text-primary">{product.categoryName}</p>
        <h1 className="font-heading text-2xl font-bold text-foreground">{product.name}</h1>
        <div className="mt-1">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-foreground">{formatCurrency(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-base text-muted-foreground line-through">
            {formatCurrency(product.compareAtPrice)}
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground">{product.description}</p>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-border">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setQuantity((quantity) => Math.max(1, quantity - 1))}
          >
            <Minus className="size-4" />
          </Button>
          <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setQuantity((quantity) => quantity + 1)}
          >
            <Plus className="size-4" />
          </Button>
        </div>
        <span className="text-xs text-muted-foreground">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </span>
      </div>

      <div className="flex gap-3">
        <Button
          className="flex-1 rounded-full"
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button
          variant="outline"
          className="flex-1 rounded-full"
          disabled={product.stock === 0}
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label="Toggle wishlist"
          onClick={() => toggleWishlist(product)}
        >
          <Heart className={cn('size-4', isWishlisted && 'fill-primary text-primary')} />
        </Button>
      </div>
    </div>
  )
}
