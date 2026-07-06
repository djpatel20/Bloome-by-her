import { create } from 'zustand'
import type { User } from '@/types'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

interface AuthState {
  user: User | null
  status: AuthStatus
  setUser: (user: User) => void
  clear: () => void
}

// No `persist` here on purpose: the access/refresh tokens live in httpOnly
// cookies now, never in JS-reachable storage. `user` is refetched from
// `/auth/me` on every app load (see useSessionBootstrap in useAuth.ts), so
// there's nothing sensitive to persist client-side.
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  status: 'loading',
  setUser: (user) => set({ user, status: 'authenticated' }),
  clear: () => set({ user: null, status: 'unauthenticated' }),
}))
