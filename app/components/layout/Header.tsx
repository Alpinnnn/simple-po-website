'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, profile, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          Food Pre-Order
        </Link>

        <nav>
          <ul className="flex space-x-4 items-center">
            {!loading && (
              <>
                {user ? (
                  <>
                    <li>
                      <span className="text-gray-600">Hello, {profile?.full_name || user.email}</span>
                    </li>
                    {profile?.role === 'admin' && (
                      <li>
                        <Link
                          href="/admin"
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Admin Panel
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/login"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/register"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
} 