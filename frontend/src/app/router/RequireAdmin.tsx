import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/store/authStore'

export function RequireAdmin() {
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <Navigate to={ROUTES.login} replace />
  }

  if (user.role !== 'admin') {
    return <Navigate to={ROUTES.home} replace />
  }

  return <Outlet />
}
