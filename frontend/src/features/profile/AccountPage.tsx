import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { customerService } from '@/services/customerService'

interface AccountFormValues {
  name: string
  email: string
  phone: string
}

export default function AccountPage() {
  const user = useAuthStore((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AccountFormValues>({
    defaultValues: { name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' },
  })

  async function onSubmit(values: AccountFormValues) {
    await customerService.updateProfile(values)
    toast.success('Profile updated')
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <Helmet>
        <title>My Account — Bloome By Her</title>
      </Helmet>
      <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Account Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" {...register('name')} />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" {...register('email')} />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input id="phone" {...register('phone')} />
        </Field>
        <Button type="submit" className="w-fit rounded-full" disabled={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </div>
  )
}
