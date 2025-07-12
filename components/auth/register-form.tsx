'use client'

import { toast } from "sonner"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { z } from 'zod'
import { useState, useTransition } from "react"
import { signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import SocialProviders from "./social-providers"

const validEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com']

const registerSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z
      .string()
      .email('Enter a valid email')
      .refine((email) => {
        const domain = email.split('@')[1]
        return validEmailDomains.includes(domain)
      }, {
        message: 'Invalid email domain. Use gmail, yahoo, or outlook.',
      }),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })


  const onRegisterSubmit = () => {
    startTransition(async () => {
      const result = registerSchema.safeParse(form)
      if (!result.success) {
        toast.error(result.error.issues[0].message)
        return
      }
      try {
        const session = await signUp.email({
          name: form.name,
          email: form.email,
          password: form.password,
        })

        const { error } = session

        if (error) {
          toast.error(error.message || 'Registration failed')
        } else {
          toast.success('Registration successful')
          router.push('/auth/login')
        }
      } catch (err) {
        toast.error('Something went wrong')
        console.error(err)
      }
    })
  }

  return (
    <form
      className="w-full max-w-md p-6 rounded-xl bg-white dark:bg-card border border-border shadow-sm space-y-2"
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Create an account</h2>
        <p className="text-muted-foreground text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@gmail.com"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
      </div>

      <Button type="submit" disabled={isPending} onClick={onRegisterSubmit} className="w-full">
        {isPending ? 'Registering...' : 'Register'}
      </Button>
      <SocialProviders />
    </form>
  )
}