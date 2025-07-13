'use client';
import LoginForm from "@/components/auth/login-form";

export default function Login() {
  return (
    <div className="flex min-h-[90vh] items-center justify-center px-2 bg-background">
      <div className="w-full max-w-md space-y-6">
        <LoginForm />
      </div>
    </div>
  );
}
