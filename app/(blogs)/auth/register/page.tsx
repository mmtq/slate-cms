
'use client'

import RegisterForm from "@/components/auth/register-form";

export default function Register() {
  return (
    <main className="flex min-h-[90vh] items-center justify-center px-2 bg-background">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>

  )
}