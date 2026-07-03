import type { LucideIcon } from 'lucide-react'
import { PackageSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyState({
  icon: Icon = PackageSearch,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon?: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-accent">
        <Icon className="size-7 text-accent-foreground" />
      </div>
      <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
