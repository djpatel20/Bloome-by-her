import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { EmptyState } from '@/components/common/EmptyState'
import { ROUTES } from '@/constants/routes'
import { formatCurrency } from '@/utils/format'
import { useCartStore } from '@/store/cartStore'
import { useCreateOrder } from '@/hooks/useOrders'
import type { PaymentMethod } from '@/types'

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  line1: z.string().min(3, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(4, 'Pincode is required'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  paymentMethod: z.enum(['cod', 'upi', 'card', 'netbanking']),
})

type ShippingFormValues = z.infer<typeof shippingSchema>

const SHIPPING_FLAT_RATE = 40

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const subtotal = useCartStore((state) => state.subtotal())
  const clearCart = useCartStore((state) => state.clear)
  const createOrder = useCreateOrder()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { paymentMethod: 'cod' },
  })

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <EmptyState title="Your cart is empty" description="Add items before checking out." />
      </div>
    )
  }

  const shipping = SHIPPING_FLAT_RATE
  const total = subtotal + shipping

  async function onSubmit(values: ShippingFormValues) {
    const order = await createOrder.mutateAsync({
      items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      paymentMethod: values.paymentMethod as PaymentMethod,
      shippingAddress: {
        id: '',
        fullName: values.fullName,
        line1: values.line1,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        phone: values.phone,
        isDefault: false,
      },
    })
    clearCart()
    toast.success('Order placed successfully!')
    navigate(`${ROUTES.orders}/${order.id}`)
  }

  return (
    <>
      <Helmet>
        <title>Checkout — Bloome By Her</title>
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <h1 className="mb-6 font-heading text-3xl font-bold text-foreground">Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-4 font-heading text-lg font-bold text-foreground">
                Shipping Address
              </h2>
              <div className="flex flex-col gap-4">
                <Field>
                  <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                  <Input id="fullName" {...register('fullName')} />
                  <FieldError errors={[errors.fullName]} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="line1">Address</FieldLabel>
                  <Input id="line1" {...register('line1')} />
                  <FieldError errors={[errors.line1]} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="city">City</FieldLabel>
                    <Input id="city" {...register('city')} />
                    <FieldError errors={[errors.city]} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="pincode">Pincode</FieldLabel>
                    <Input id="pincode" {...register('pincode')} />
                    <FieldError errors={[errors.pincode]} />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="state">State</FieldLabel>
                    <Input id="state" {...register('state')} />
                    <FieldError errors={[errors.state]} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <Input id="phone" {...register('phone')} />
                    <FieldError errors={[errors.phone]} />
                  </Field>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-4 font-heading text-lg font-bold text-foreground">
                Payment Method
              </h2>
              <RadioGroup
                value={watch('paymentMethod')}
                onValueChange={(value) =>
                  setValue('paymentMethod', value as PaymentMethod, { shouldValidate: true })
                }
                className="flex flex-col gap-3"
              >
                {[
                  { value: 'cod', label: 'Cash on Delivery' },
                  { value: 'upi', label: 'UPI' },
                  { value: 'card', label: 'Credit / Debit Card' },
                  { value: 'netbanking', label: 'Net Banking' },
                ].map((option) => (
                  <Label
                    key={option.value}
                    className="flex items-center gap-3 rounded-2xl border border-border p-3 text-sm font-normal"
                  >
                    <RadioGroupItem value={option.value} />
                    {option.label}
                  </Label>
                ))}
              </RadioGroup>
            </section>
          </div>

          <div className="flex h-fit flex-col gap-4 rounded-3xl border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-bold text-foreground">Order Summary</h2>
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-semibold text-foreground">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="flex justify-between border-t border-border pt-4 text-sm text-muted-foreground">
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
            <Button type="submit" className="rounded-full" disabled={isSubmitting}>
              Place Order
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
