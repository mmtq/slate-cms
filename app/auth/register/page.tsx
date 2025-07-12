
'use client'

import RegisterForm from "@/components/auth/register-form";

export default function Register() {
  return (
    <main className="flex items-center justify-center py-4 bg-background">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>

  )
}