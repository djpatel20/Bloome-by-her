import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-heading text-5xl font-extrabold text-primary">404</h1>
      <p className="text-muted-foreground">This page has wilted away.</p>
      <Button className="rounded-full" render={<Link to={ROUTES.home}>Back to Home</Link>} />
    </div>
  )
}
