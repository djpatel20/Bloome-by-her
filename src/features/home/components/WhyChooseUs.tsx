import { HandHeart, PenTool, Gift, HeartHandshake } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'

const REASONS = [
  { icon: HandHeart, label: '100% Handmade' },
  { icon: PenTool, label: 'Unique Designs' },
  { icon: Gift, label: 'Perfect for Gifting' },
  { icon: HeartHandshake, label: 'Made with Love' },
]

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <SectionHeading title="Why Choose Bloome By Her?" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {REASONS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-card p-6 text-center"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-accent">
              <Icon className="size-6 text-accent-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
