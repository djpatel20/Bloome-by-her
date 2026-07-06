import { Link } from 'react-router-dom'
import { Sparkle } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to={ROUTES.home} className={cn('flex items-center gap-1 font-heading', className)}>
      <span className="text-2xl font-bold text-primary">Bloome</span>
      <Sparkle className="size-4 fill-primary text-primary" />
      <span className="text-2xl font-bold text-secondary-foreground">By Her</span>
    </Link>
  )
}
