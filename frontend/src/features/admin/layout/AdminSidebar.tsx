import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  Star,
  Image,
  Home,
  FolderOpen,
  Ticket,
  Settings,
  LogOut,
} from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { useLogout } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', to: ROUTES.admin.dashboard, icon: LayoutDashboard, end: true },
  { label: 'Products', to: ROUTES.admin.products, icon: Package },
  { label: 'Categories', to: ROUTES.admin.categories, icon: Tags },
  { label: 'Orders', to: ROUTES.admin.orders, icon: ShoppingCart },
  { label: 'Customers', to: ROUTES.admin.customers, icon: Users },
  { label: 'Reviews', to: ROUTES.admin.reviews, icon: Star },
  { label: 'Banners', to: ROUTES.admin.banners, icon: Image },
  { label: 'Homepage', to: ROUTES.admin.homepage, icon: Home },
  { label: 'Media Library', to: ROUTES.admin.media, icon: FolderOpen },
  { label: 'Coupons', to: ROUTES.admin.coupons, icon: Ticket },
  { label: 'Settings', to: ROUTES.admin.settings, icon: Settings },
]

export function AdminSidebar({
  className,
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  const logout = useLogout()

  return (
    <aside className={cn('flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground', className)}>
      <div className="px-5 py-6">
        <span className="font-heading text-xl font-bold text-sidebar-primary">Bloome By Her</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
        {NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-sidebar-foreground/70 transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isActive && 'bg-sidebar-primary text-sidebar-primary-foreground',
              )
            }
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => {
          onNavigate?.()
          logout.mutate()
        }}
        className="flex items-center gap-3 border-t border-sidebar-border px-6 py-4 text-sm font-semibold text-sidebar-foreground/70 transition hover:text-sidebar-accent-foreground"
      >
        <LogOut className="size-4" />
        Logout
      </button>
    </aside>
  )
}
