import { Link, NavLink } from 'react-router-dom'
import { Heart, LayoutDashboard, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUiStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Shop', to: ROUTES.shop },
  { label: 'Categories', to: ROUTES.shop },
  { label: 'About Us', to: '/about' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
]

export function Navbar() {
  const totalQuantity = useCartStore((state) => state.totalQuantity())
  const wishlistCount = useWishlistStore((state) => state.items.length)
  const isMobileNavOpen = useUiStore((state) => state.isMobileNavOpen)
  const toggleMobileNav = useUiStore((state) => state.toggleMobileNav)
  const isAdmin = useAuthStore((state) => state.user?.role === 'admin')

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-semibold text-foreground/70 transition hover:text-primary',
                  isActive && 'text-primary',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          {isAdmin && (
            <Button
              size="sm"
              className="hidden rounded-full sm:flex"
              render={
                <Link to={ROUTES.admin.root}>
                  <LayoutDashboard className="size-4" />
                  Admin Panel
                </Link>
              }
            />
          )}
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
            <Search className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            aria-label="Wishlist"
            render={
              <Link to={ROUTES.wishlist}>
                <Heart className="size-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            }
          />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Account"
            render={
              <Link to={ROUTES.profile}>
                <User className="size-5" />
              </Link>
            }
          />
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            aria-label="Cart"
            render={
              <Link to={ROUTES.cart}>
                <ShoppingBag className="size-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            }
          />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            aria-label="Menu"
            onClick={toggleMobileNav}
          >
            {isMobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {isMobileNavOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-4 py-3 lg:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-accent"
            >
              {link.label}
            </NavLink>
          ))}
          {isAdmin && (
            <Link
              to={ROUTES.admin.root}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-accent"
            >
              <LayoutDashboard className="size-4" />
              Admin Panel
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
