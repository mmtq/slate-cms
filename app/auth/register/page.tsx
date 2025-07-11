
'use client'

import RegisterForm from "@/components/auth/register-form";

export default function Register() {
  return (
    <main className="flex items-center justify-center px-4 py-8 bg-background">
      <div className="w-full max-w-md space-y-6">
        <RegisterForm />
      </div>
    </main>

  )
}