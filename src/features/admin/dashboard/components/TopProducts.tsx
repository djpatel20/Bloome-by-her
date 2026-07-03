import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { formatCurrency } from '@/utils/format'
import { useTopProducts } from '@/hooks/useAdminDashboard'

export function TopProducts() {
  const { data: products, isLoading } = useTopProducts()

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <h3 className="mb-4 font-heading text-sm font-bold text-foreground">Top Products</h3>
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full rounded-2xl" />
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <EmptyState title="No products yet" />
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-3">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="size-10 rounded-xl bg-brand-blush object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{product.name}</p>
              </div>
              <span className="text-sm font-bold text-foreground">
                {formatCurrency(product.price)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
