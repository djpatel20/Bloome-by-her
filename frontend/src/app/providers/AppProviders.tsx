import type { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryProvider } from './QueryProvider'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <QueryProvider>
        <BrowserRouter>
          <TooltipProvider delay={200}>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  borderRadius: '1rem',
                  background: 'var(--card)',
                  color: 'var(--card-foreground)',
                  border: '1px solid var(--border)',
                },
              }}
            />
          </TooltipProvider>
        </BrowserRouter>
      </QueryProvider>
    </HelmetProvider>
  )
}
