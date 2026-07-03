import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface StoreSettingsValues {
  storeName: string
  supportEmail: string
  supportPhone: string
  address: string
}

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreSettingsValues>({
    defaultValues: {
      storeName: 'Bloome By Her',
      supportEmail: '',
      supportPhone: '',
      address: '',
    },
  })

  function onSubmit() {
    toast.success('Settings saved')
  }

  return (
    <>
      <Helmet>
        <title>Settings — Admin — Bloome By Her</title>
      </Helmet>
      <h1 className="mb-6 font-heading text-2xl font-bold text-foreground">Settings</h1>

      <div className="max-w-xl rounded-3xl border border-border bg-card p-6">
        <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Store Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="storeName">Store Name</FieldLabel>
            <Input id="storeName" {...register('storeName')} />
          </Field>
          <Field>
            <FieldLabel htmlFor="supportEmail">Support Email</FieldLabel>
            <Input id="supportEmail" type="email" {...register('supportEmail')} />
          </Field>
          <Field>
            <FieldLabel htmlFor="supportPhone">Support Phone</FieldLabel>
            <Input id="supportPhone" {...register('supportPhone')} />
          </Field>
          <Field>
            <FieldLabel htmlFor="address">Business Address</FieldLabel>
            <Textarea id="address" rows={3} {...register('address')} />
          </Field>
          <Button type="submit" className="w-fit" disabled={isSubmitting}>
            Save Settings
          </Button>
        </form>
      </div>
    </>
  )
}
