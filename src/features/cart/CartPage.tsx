import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/common/EmptyState'
import { ROUTES } from '@/constants/routes'
import { formatCurrency } from '@/utils/format'
import { useCartStore } from '@/store/cartStore'

const SHIPPING_FLAT_RATE = 40

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const subtotal = useCartStore((state) => state.subtotal())

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Helmet>
          <title>Your Cart — Bloome By Her</title>
        </Helmet>
        <EmptyState
          title="Your cart is empty"
          description="Add some handmade goodies to get started."
          actionLabel="Continue Shopping"
        />
        <div className="mt-4 flex justify-center">
          <Button
            className="rounded-full"
            render={<Link to={ROUTES.shop}>Continue Shopping</Link>}
          />
        </div>
      </div>
    )
  }

  const shipping = SHIPPING_FLAT_RATE
  const total = subtotal + shipping

  return (
    <>
      <Helmet>
        <title>Your Cart — Bloome By Her</title>
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <h1 className="mb-6 font-heading text-3xl font-bold text-foreground">Your Cart</h1>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4"
              >
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="size-20 rounded-2xl bg-brand-blush object-cover"
                />
                <div className="flex-1">
                  <Link
                    to={ROUTES.product(item.product.slug)}
                    className="font-heading text-sm font-bold text-foreground"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(item.product.price)}
                  </p>
                  <div className="mt-2 flex items-center rounded-full border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 rounded-full"
                      onClick={() => setQuantity(item.productId, item.quantity - 1)}
                    >
                      <Minus className="size-3.5" />
                    </Button>
                    <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 rounded-full"
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="size-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm font-bold text-foreground">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    aria-label="Remove item"
                    onClick={() => removeItem(item.productId)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex h-fit flex-col gap-4 rounded-3xl border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-bold text-foreground">Order Summary</h2>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-4 text-base font-bold text-foreground">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Button
              className="rounded-full"
              render={<Link to={ROUTES.checkout}>Proceed to Checkout</Link>}
            />
          </div>
        </div>
      </div>
    </>
  )
}
