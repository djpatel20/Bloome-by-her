import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { AuthCard } from './components/AuthCard'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useRegister } from '@/hooks/useAuth'

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const navigate = useNavigate()
  const register_ = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) })

  async function onSubmit(values: RegisterFormValues) {
    try {
      await register_.mutateAsync(values)
      toast.success('Account created!')
      navigate(ROUTES.home)
    } catch {
      toast.error('Could not create account')
    }
  }

  return (
    <>
      <Helmet>
        <title>Create Account — Bloome By Her</title>
      </Helmet>
      <AuthCard title="Create Account">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" {...register('name')} />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" {...register('email')} />
            <FieldError errors={[errors.email]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" {...register('password')} />
            <FieldError errors={[errors.password]} />
          </Field>
          <Button type="submit" className="mt-2 rounded-full" disabled={isSubmitting}>
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to={ROUTES.login} className="font-semibold text-primary">
            Log in
          </Link>
        </p>
      </AuthCard>
    </>
  )
}
