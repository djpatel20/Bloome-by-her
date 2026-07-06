import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SectionHeading({
  title,
  action,
  className,
}: {
  title: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mb-6 flex items-center justify-between', className)}>
      <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
        <Sparkles className="size-5 fill-primary text-primary" />
        {title}
      </h2>
      {action}
    </div>
  )
}
