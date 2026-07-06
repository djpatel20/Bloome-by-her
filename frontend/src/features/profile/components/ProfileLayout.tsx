import { NavLink, Outlet } from 'react-router-dom'
import { LogOut, Package, User } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/store/authStore'
import { useLogout } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Account', to: ROUTES.profile, icon: User },
  { label: 'Orders', to: ROUTES.orders, icon: Package },
]

export function ProfileLayout() {
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <h1 className="mb-6 font-heading text-3xl font-bold text-foreground">
        Hi, {user?.name ?? 'there'} 👋
      </h1>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="flex flex-col gap-1 rounded-3xl border border-border bg-card p-3">
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              end
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-foreground/70 transition hover:bg-accent',
                  isActive && 'bg-accent text-accent-foreground',
                )
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => logout.mutate()}
            className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/10"
          >
            <LogOut className="size-4" />
            Log Out
          </button>
        </nav>
        <Outlet />
      </div>
    </div>
  )
}
