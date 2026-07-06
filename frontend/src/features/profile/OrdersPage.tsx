import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { formatCurrency, formatDate } from '@/utils/format'
import { useMyOrders } from '@/hooks/useOrders'

export default function OrdersPage() {
  const { data: orders, isLoading, isError, refetch } = useMyOrders()

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <Helmet>
        <title>My Orders — Bloome By Her</title>
      </Helmet>
      <h2 className="mb-4 font-heading text-lg font-bold text-foreground">My Orders</h2>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-16 rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !orders || orders.length === 0 ? (
        <EmptyState title="No orders yet" description="Your placed orders will show up here." />
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/profile/orders/${order.id}`}
              className="flex items-center justify-between rounded-2xl border border-border p-4 transition hover:bg-accent"
            >
              <div>
                <p className="text-sm font-bold text-foreground">#{order.orderNumber}</p>
                <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
              </div>
              <Badge variant="secondary" className="capitalize">
                {order.status}
              </Badge>
              <span className="text-sm font-bold text-foreground">
                {formatCurrency(order.total)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
