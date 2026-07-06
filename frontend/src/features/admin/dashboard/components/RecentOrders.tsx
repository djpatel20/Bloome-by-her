import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { ROUTES } from '@/constants/routes'
import { formatCurrency } from '@/utils/format'
import { useAdminOrders } from '@/hooks/useAdminOrders'

export function RecentOrders() {
  const { data, isLoading } = useAdminOrders({ pageSize: 5 })

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-foreground">Recent Orders</h3>
        <Link to={ROUTES.admin.orders} className="text-xs font-semibold text-primary">
          View All
        </Link>
      </div>
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState title="No orders yet" />
      ) : (
        <div className="flex flex-col gap-3">
          {data.items.map((order) => (
            <div key={order.id} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold text-foreground">#{order.orderNumber}</p>
                <Badge variant="secondary" className="mt-0.5 capitalize">
                  {order.status}
                </Badge>
              </div>
              <span className="font-bold text-foreground">{formatCurrency(order.total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
