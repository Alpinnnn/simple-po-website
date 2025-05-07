'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/app/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !profile || profile.role !== 'admin')) {
      router.push('/');
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user || !profile || profile.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link 
            href="/admin" 
            className="block px-4 py-2 rounded hover:bg-indigo-700"
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/canteens" 
            className="block px-4 py-2 rounded hover:bg-indigo-700"
          >
            Manage Canteens
          </Link>
          <Link 
            href="/admin/food" 
            className="block px-4 py-2 rounded hover:bg-indigo-700"
          >
            Manage Foods
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
} 