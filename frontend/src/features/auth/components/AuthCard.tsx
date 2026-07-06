import type { ReactNode } from 'react'
import { Logo } from '@/components/common/Logo'

export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-12">
      <Logo className="mb-6" />
      <div className="w-full rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="mb-6 text-center font-heading text-2xl font-bold text-foreground">
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
}
