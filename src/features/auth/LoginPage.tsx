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
import { useLogin } from '@/hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(values: LoginFormValues) {
    try {
      await login.mutateAsync(values)
      toast.success('Welcome back!')
      navigate(ROUTES.home)
    } catch {
      toast.error('Invalid email or password')
    }
  }

  return (
    <>
      <Helmet>
        <title>Login — Bloome By Her</title>
      </Helmet>
      <AuthCard title="Welcome Back">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            Log In
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to={ROUTES.register} className="font-semibold text-primary">
            Sign up
          </Link>
        </p>
      </AuthCard>
    </>
  )
}
