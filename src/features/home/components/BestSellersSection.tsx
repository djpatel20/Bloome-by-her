import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useBestSellers } from '@/hooks/useProducts'

export function BestSellersSection() {
  const { data: products, isLoading, isError } = useBestSellers()

  if (isError) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <SectionHeading
        title="Best Sellers"
        action={
          <Button
            variant="ghost"
            size="sm"
            render={<Link to={`${ROUTES.shop}?sort=best-selling`}>View All</Link>}
          />
        }
      />
      <ProductGrid products={products ?? []} isLoading={isLoading} skeletonCount={4} />
    </section>
  )
}
