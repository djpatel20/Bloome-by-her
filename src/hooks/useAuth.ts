import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants/routes'
import type { LoginPayload, RegisterPayload } from '@/types'

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser)
  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => setUser(data.user),
  })
}

export function useRegister() {
  const setUser = useAuthStore((state) => state.setUser)
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => setUser(data.user),
  })
}

export function useLogout() {
  const clear = useAuthStore((state) => state.clear)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => authService.logout(),
    // Clear local state regardless of whether the network call succeeds —
    // the user should never be stuck "logged in" client-side.
    onSettled: () => {
      clear()
      queryClient.clear()
      navigate(ROUTES.login)
    },
  })
}

/**
 * Establishes the session on app load by asking the backend who the
 * httpOnly access-token cookie belongs to. There is no token in
 * localStorage to read anymore, so this replaces the old zustand
 * `persist` rehydration — and, unlike that rehydration, route guards can
 * safely wait for it to settle before rendering (see authStore's
 * `status` field and RequireAuth/RequireAdmin).
 */
export function useSessionBootstrap() {
  const setUser = useAuthStore((state) => state.setUser)
  const clear = useAuthStore((state) => state.clear)

  useEffect(() => {
    let cancelled = false
    authService
      .me()
      .then((user) => {
        if (!cancelled) setUser(user)
      })
      .catch(() => {
        if (!cancelled) clear()
      })
    return () => {
      cancelled = true
    }
  }, [setUser, clear])
}
