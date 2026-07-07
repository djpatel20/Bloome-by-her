import { ChevronDown, Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'

export function AdminTopbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 sm:justify-end sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Open menu"
        onClick={onMenuClick}
      >
        <Menu className="size-5" />
      </Button>
      <div className="flex items-center gap-3">
        <Avatar className="size-9">
          <AvatarImage src={user?.avatarUrl} alt={user?.name} />
          <AvatarFallback>{user?.name?.[0] ?? 'A'}</AvatarFallback>
        </Avatar>
        <div className="hidden text-sm sm:block">
          <p className="font-semibold text-foreground">{user?.name ?? 'Admin'}</p>
        </div>
        <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
      </div>
    </header>
  )
}
