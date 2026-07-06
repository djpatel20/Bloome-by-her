import type { LucideIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export function StatCard({
  icon: Icon,
  label,
  value,
  isLoading,
}: {
  icon: LucideIcon
  label: string
  value: string
  isLoading?: boolean
}) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-accent">
        <Icon className="size-6 text-accent-foreground" />
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        {isLoading ? (
          <Skeleton className="mt-1 h-6 w-20" />
        ) : (
          <p className="font-heading text-2xl font-bold text-foreground">{value}</p>
        )}
      </div>
    </div>
  )
}
