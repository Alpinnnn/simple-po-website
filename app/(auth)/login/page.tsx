import React from 'react';
import LoginForm from '@/app/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <div className="text-center mb-6">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Food Pre-Order
        </Link>
      </div>
      <LoginForm />
    </>
  );
} 