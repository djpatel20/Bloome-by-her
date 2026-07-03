import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface ContactFormValues {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormValues>()

  function onSubmit() {
    toast.success("Thanks for reaching out! We'll get back to you soon.")
    reset()
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 lg:px-8">
      <Helmet>
        <title>Contact — Bloome By Her</title>
      </Helmet>
      <h1 className="mb-6 font-heading text-3xl font-bold text-foreground">Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" {...register('name', { required: true })} />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" {...register('email', { required: true })} />
        </Field>
        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea id="message" rows={4} {...register('message', { required: true })} />
        </Field>
        <Button type="submit" className="w-fit rounded-full" disabled={isSubmitting}>
          Send Message
        </Button>
      </form>
    </div>
  )
}
