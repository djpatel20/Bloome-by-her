import { ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/store/authStore'

export function AdminTopbar() {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="flex items-center justify-end gap-3 border-b border-border bg-card px-6 py-3">
      <Avatar className="size-9">
        <AvatarImage src={user?.avatarUrl} alt={user?.name} />
        <AvatarFallback>{user?.name?.[0] ?? 'A'}</AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <p className="font-semibold text-foreground">{user?.name ?? 'Admin'}</p>
      </div>
      <ChevronDown className="size-4 text-muted-foreground" />
    </header>
  )
}
