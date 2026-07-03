import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { StorefrontLayout } from '@/components/layout/StorefrontLayout'
import { AdminLayout } from '@/features/admin/layout/AdminLayout'
import { RequireAuth } from './RequireAuth'
import { RequireAdmin } from './RequireAdmin'
import { PageLoader } from '@/components/common/PageLoader'
import { ROUTES } from '@/constants/routes'
import { useSessionBootstrap } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/authStore'

const HomePage = lazy(() => import('@/features/home/HomePage'))
const ShopPage = lazy(() => import('@/features/shop/ShopPage'))
const ProductDetailPage = lazy(() => import('@/features/product/ProductDetailPage'))
const CartPage = lazy(() => import('@/features/cart/CartPage'))
const CheckoutPage = lazy(() => import('@/features/checkout/CheckoutPage'))
const WishlistPage = lazy(() => import('@/features/wishlist/WishlistPage'))
const LoginPage = lazy(() => import('@/features/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/features/auth/RegisterPage'))
const AboutPage = lazy(() => import('@/features/static/AboutPage'))
const ContactPage = lazy(() => import('@/features/static/ContactPage'))
const ReviewsPage = lazy(() => import('@/features/review/ReviewsPage'))
const NotFoundPage = lazy(() => import('@/features/static/NotFoundPage'))

const ProfileLayoutLazy = lazy(() =>
  import('@/features/profile/components/ProfileLayout').then((m) => ({ default: m.ProfileLayout })),
)
const AccountPage = lazy(() => import('@/features/profile/AccountPage'))
const OrdersPage = lazy(() => import('@/features/profile/OrdersPage'))
const OrderDetailPage = lazy(() => import('@/features/profile/OrderDetailPage'))

const DashboardPage = lazy(() => import('@/features/admin/dashboard/DashboardPage'))
const AdminProductsPage = lazy(() => import('@/features/admin/products/ProductsPage'))
const AdminCategoriesPage = lazy(() => import('@/features/admin/categories/CategoriesPage'))
const AdminOrdersPage = lazy(() => import('@/features/admin/orders/OrdersPage'))
const AdminCustomersPage = lazy(() => import('@/features/admin/customers/CustomersPage'))
const AdminReviewsPage = lazy(() => import('@/features/admin/reviews/ReviewsPage'))
const AdminBannersPage = lazy(() => import('@/features/admin/banners/BannersPage'))
const AdminHomepagePage = lazy(() => import('@/features/admin/homepage/HomepagePage'))
const AdminMediaPage = lazy(() => import('@/features/admin/media/MediaPage'))
const AdminCouponsPage = lazy(() => import('@/features/admin/coupons/CouponsPage'))
const AdminSettingsPage = lazy(() => import('@/features/admin/settings/SettingsPage'))

export function AppRouter() {
  useSessionBootstrap()
  const status = useAuthStore((state) => state.status)

  // Wait for the /auth/me bootstrap to settle before mounting any routes.
  // Guards (RequireAuth/RequireAdmin) read `user`/`status` synchronously on
  // first render, so rendering routes before this resolves is what caused
  // the old "hard refresh on /admin bounces to /login" bug.
  if (status === 'loading') {
    return <PageLoader />
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<StorefrontLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.shop} element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path={ROUTES.cart} element={<CartPage />} />
          <Route path={ROUTES.wishlist} element={<WishlistPage />} />
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />

          <Route element={<RequireAuth />}>
            <Route path={ROUTES.checkout} element={<CheckoutPage />} />
            <Route element={<ProfileLayoutLazy />}>
              <Route path={ROUTES.profile} element={<AccountPage />} />
              <Route path={ROUTES.orders} element={<OrdersPage />} />
              <Route path="/profile/orders/:id" element={<OrderDetailPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<RequireAdmin />}>
          <Route path={ROUTES.admin.root} element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />   
            <Route path="banners" element={<AdminBannersPage />} />
            <Route path="homepage" element={<AdminHomepagePage />} />
            <Route path="media" element={<AdminMediaPage />} />
            <Route path="coupons" element={<AdminCouponsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
