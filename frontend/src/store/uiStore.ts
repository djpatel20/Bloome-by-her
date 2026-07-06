import { create } from 'zustand'

interface UiState {
  isCartOpen: boolean
  isMobileNavOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleMobileNav: () => void
  closeMobileNav: () => void
}

export const useUiStore = create<UiState>((set) => ({
  isCartOpen: false,
  isMobileNavOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
}))
