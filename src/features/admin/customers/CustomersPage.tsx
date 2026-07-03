import { Helmet } from 'react-helmet-async'
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
import { formatDate } from '@/utils/format'
import { useAdminCustomers } from '@/hooks/useAdminCustomers'

export default function CustomersPage() {
  const { data, isLoading, isError, refetch } = useAdminCustomers()

  return (
    <>
      <Helmet>
        <title>Customers — Admin — Bloome By Her</title>
      </Helmet>
      <h1 className="mb-6 font-heading text-2xl font-bold text-foreground">Customers</h1>

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
          <EmptyState title="No customers yet" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-semibold text-foreground">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone ?? '—'}</TableCell>
                  <TableCell>{formatDate(customer.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}
