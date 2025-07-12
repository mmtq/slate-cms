'use client';
import LoginForm from "@/components/auth/login-form";

export default function Login() {
  return (
    <div className="flex items-center justify-center py-8 bg-background">
      <div className="w-full max-w-md space-y-6">
        <LoginForm />
      </div>
    </div>
  );
}
