import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/store/authStore'

export function RequireAuth() {
  const user = useAuthStore((state) => state.user)
  const location = useLocation()

  // AppRouter blocks on status === 'loading' before any route (including
  // this guard) renders, so by the time we get here the session bootstrap
  // has settled and `user` reflects the real session.
  if (!user) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />
  }

  return <Outlet />
}
