import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { useSalesOverview } from '@/hooks/useAdminDashboard'

export function SalesOverviewChart() {
  const { data, isLoading } = useSalesOverview()

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-foreground">Sales Overview</h3>
        <span className="text-xs font-semibold text-muted-foreground">This Month</span>
      </div>
      {isLoading ? (
        <Skeleton className="h-56 w-full rounded-2xl" />
      ) : (
        <ResponsiveContainer width="100%" height={224}>
          <AreaChart data={data ?? []}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--brand-pink)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--brand-pink)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--card)',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--brand-pink)"
              fill="url(#salesGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
