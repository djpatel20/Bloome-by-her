import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/common/ErrorState'
import { formatCurrency, formatDate } from '@/utils/format'
import { useOrder } from '@/hooks/useOrders'

export default function OrderDetailPage() {
  const { id = '' } = useParams()
  const { data: order, isLoading, isError, refetch } = useOrder(id)

  if (isLoading) {
    return <Skeleton className="h-64 rounded-3xl" />
  }

  if (isError || !order) {
    return <ErrorState onRetry={() => refetch()} />
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <Helmet>
        <title>Order #{order.orderNumber} — Bloome By Her</title>
      </Helmet>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Order #{order.orderNumber}
        </h2>
        <Badge variant="secondary" className="capitalize">
          {order.status}
        </Badge>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>

      <div className="flex flex-col gap-3">
        {order.items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4">
            <img
              src={item.productImage}
              alt={item.productName}
              className="size-16 rounded-2xl bg-brand-blush object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{item.productName}</p>
              <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
            </div>
            <span className="text-sm font-bold text-foreground">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-border pt-4 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>{formatCurrency(order.shipping)}</span>
        </div>
        <div className="mt-2 flex justify-between text-base font-bold text-foreground">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-accent p-4 text-sm text-accent-foreground">
        <p className="font-semibold">{order.shippingAddress.fullName}</p>
        <p>
          {order.shippingAddress.line1}, {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
          {order.shippingAddress.pincode}
        </p>
        <p>{order.shippingAddress.phone}</p>
      </div>
    </div>
  )
}
