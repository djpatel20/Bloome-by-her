import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Truck, HandHeart, ShieldCheck, Gem } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import heroImg from '@/assets/images/hero.png'

const FEATURE_BADGES = [
  { icon: HandHeart, label: 'Handmade With Love' },
  { icon: Gem, label: 'Premium Quality' },
  { icon: ShieldCheck, label: 'Secure Payment' },
  { icon: Truck, label: 'Fast & Safe Delivery' },
]

export function Hero() {
  return (
    <section className="overflow-hidden bg-brand-blush">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-5xl font-extrabold text-primary sm:text-6xl">
            Bloome
            <br />
            By Her
          </h1>
          <p className="mt-3 font-heading text-lg font-semibold text-foreground/80">
            Handmade Flowers, Made with Love 💗
          </p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Handmade pipe cleaner flowers, bouquets, keychains, hair clips &amp; more — crafted with
            love for every special moment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="rounded-full"
              render={<Link to={ROUTES.shop}>Shop Collection</Link>}
            />
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              render={<Link to={`${ROUTES.shop}?sort=best-selling`}>Best Sellers</Link>}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center"
        >
          <img
            src={heroImg}
            alt="Handmade flower bouquet"
             className="w-full max-w-4xl drop-shadow-xl"
          />
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 border-t border-border/60 px-4 py-6 sm:grid-cols-4 lg:px-8">
        {FEATURE_BADGES.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="size-5 text-primary" />
            <span className="text-xs font-semibold text-foreground/80 sm:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
