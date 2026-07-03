import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/common/EmptyState'
import { ProductCard } from '@/components/product/ProductCard'
import { ROUTES } from '@/constants/routes'
import { useWishlistStore } from '@/store/wishlistStore'

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items)

  return (
    <>
      <Helmet>
        <title>Your Wishlist — Bloome By Her</title>
      </Helmet>
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <h1 className="mb-6 font-heading text-3xl font-bold text-foreground">Your Wishlist</h1>
        {items.length === 0 ? (
          <>
            <EmptyState
              title="Your wishlist is empty"
              description="Save your favorite handmade pieces here."
            />
            <div className="mt-4 flex justify-center">
              <Button
                className="rounded-full"
                render={<Link to={ROUTES.shop}>Explore Products</Link>}
              />
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <ProductCard key={item.productId} product={item.product} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
