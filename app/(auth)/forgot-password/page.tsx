'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/app/lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);
    
    try {
      const supabase = createBrowserSupabaseClient();
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengirim email reset password');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="text-center mb-6">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Food Pre-Order
        </Link>
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Lupa Password</h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 p-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
        
        {success ? (
          <div className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 p-4 rounded mb-4" role="alert">
            <p className="font-medium">Email reset password telah dikirim!</p>
            <p className="mt-2">Silakan periksa inbox email Anda dan ikuti petunjuk untuk mengatur ulang password.</p>
            <div className="mt-4 text-center">
              <Link href="/login" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                Kembali ke halaman login
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Masukkan alamat email Anda dan kami akan mengirimkan link untuk mengatur ulang password.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                      Mengirim...
                    </span>
                  ) : (
                    'Kirim Link Reset Password'
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                Kembali ke halaman login
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
} 