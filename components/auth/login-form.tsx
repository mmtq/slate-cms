'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { signIn } from '@/lib/auth-client'
import Link from 'next/link'

const loginSchema = z.object({
    email: z.email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [form, setForm] = useState<LoginFormData>({
        email: '',
        password: '',
    })

    const onLoginSubmit = () => {
        startTransition(async () => {
            try {

                const result = loginSchema.safeParse(form)
                if (!result.success) {
                    toast.error(result.error.issues[0].message)
                    return
                }
                const { error } = await signIn.email({
                    email: form.email,
                    password: form.password,
                    rememberMe: true,
                })

                if (error) {
                    toast.error(error.message || 'Login failed')
                    // if (error.code === "EMAIL_NOT_VERIFIED") {
                    //     router.push('/auth/verify?error=email_not_verified')
                    // }
                } else {
                    toast.success('Login successful')
                    router.push('/')
                }
            } catch (err) {
                toast.error('Something went wrong')
                console.error(err)
            }
        })
    }

    return (
        <form
            className="w-full max-w-md p-6 rounded-xl bg-white dark:bg-card border border-border shadow-sm space-y-6"
        >
            <div className="text-center space-y-1">
                <h2 className="text-2xl font-semibold">Sign in to your account</h2>
                <p className="text-muted-foreground text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <div className='flex justify-between items-center'>
                    <Label htmlFor="password">Password</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-muted-foreground hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <Input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            </div>

            <Button
                type="submit"
                disabled={isPending}
                className="w-full"
                onClick={onLoginSubmit}
            >
                {isPending ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    )
}