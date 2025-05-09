'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/app/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createBrowserSupabaseClient();
      
      // Proses callback dari magic link
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error processing auth callback:', error);
      }
      
      // Redirect ke halaman utama
      router.push('/');
    };
    
    handleAuthCallback();
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Memproses login...</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Mohon tunggu sebentar</p>
      </div>
    </div>
  );
} 