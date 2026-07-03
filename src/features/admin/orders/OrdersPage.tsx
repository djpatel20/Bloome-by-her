import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { formatCurrency, formatDate } from '@/utils/format'
import { useAdminOrders, useUpdateOrderStatus } from '@/hooks/useAdminOrders'
import type { OrderStatus } from '@/types'

const STATUS_OPTIONS: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

export default function AdminOrdersPage() {
  const { data, isLoading, isError, refetch } = useAdminOrders()
  const updateStatus = useUpdateOrderStatus()

  async function handleStatusChange(id: string, status: OrderStatus) {
    await updateStatus.mutateAsync({ id, status })
    toast.success('Order status updated')
  }

  return (
    <>
      <Helmet>
        <title>Orders — Admin — Bloome By Her</title>
      </Helmet>
      <h1 className="mb-6 font-heading text-2xl font-bold text-foreground">Orders</h1>

      <div className="rounded-3xl border border-border bg-card p-2">
        {isLoading ? (
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !data || data.items.length === 0 ? (
          <EmptyState title="No orders yet" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold text-foreground">
                    #{order.orderNumber}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status} value={status} className="capitalize">
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}
