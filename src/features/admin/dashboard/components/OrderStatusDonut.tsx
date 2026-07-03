import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrderStatusBreakdown } from '@/hooks/useAdminDashboard'

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

export function OrderStatusDonut() {
  const { data, isLoading } = useOrderStatusBreakdown()

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <h3 className="mb-4 font-heading text-sm font-bold text-foreground">Order Status</h3>
      {isLoading ? (
        <Skeleton className="h-56 w-full rounded-2xl" />
      ) : (
        <ResponsiveContainer width="100%" height={224}>
          <PieChart>
            <Pie
              data={data ?? []}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
            >
              {(data ?? []).map((entry, index) => (
                <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--card)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
