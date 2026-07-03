import { Link } from 'react-router-dom'
import { Camera, Mail, Send } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { ROUTES } from '@/constants/routes'

const FOOTER_TRUST = ['Secure Payments', 'COD Available', 'Easy Returns', '24/7 Support']

const QUICK_LINKS = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Shop', to: ROUTES.shop },
]

const CATEGORY_LINKS = [
  { label: 'Flowers', to: ROUTES.shop },
  { label: 'Hair Clips', to: ROUTES.shop },
]

const CUSTOMER_LINKS = [
  { label: 'My Account', to: ROUTES.profile },
  { label: 'Orders', to: ROUTES.orders },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="grid grid-cols-2 gap-8 border-b border-border px-4 py-6 text-center text-xs font-semibold text-muted-foreground sm:grid-cols-4 lg:px-8">
        {FOOTER_TRUST.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="col-span-2">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Handmade with love for you and your special someone.
          </p>
          <div className="mt-4 flex gap-3">
            <Camera className="size-5 text-muted-foreground" />
            <Send className="size-5 text-muted-foreground" />
            <Mail className="size-5 text-muted-foreground" />
          </div>
        </div>

        <FooterColumn title="Quick Links" links={QUICK_LINKS} />
        <FooterColumn title="Categories" links={CATEGORY_LINKS} />
        <FooterColumn title="Customer Care" links={CUSTOMER_LINKS} />
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bloome By Her. All rights reserved.
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold text-foreground">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-muted-foreground transition hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
