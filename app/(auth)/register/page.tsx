import React from 'react';
import RegisterForm from '@/app/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <div className="text-center mb-6">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Food Pre-Order
        </Link>
      </div>
      <RegisterForm />
    </>
  );
} 