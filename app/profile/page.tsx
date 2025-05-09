'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/providers/AuthProvider';
import Image from 'next/image';
import { createBrowserSupabaseClient } from '@/app/lib/supabase';

export default function ProfilePage() {
  const { user, profile, refreshUser, loading } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [avatarUrlInput, setAvatarUrlInput] = useState('');
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordSent, setResetPasswordSent] = useState(false);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    
    if (profile) {
      setFullName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url);
    }
  }, [loading, user, profile, router]);
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Ukuran file terlalu besar (max: 2MB)' });
        return;
      }
      
      setAvatar(file);
      setAvatarUrl(URL.createObjectURL(file));
      setShowUrlInput(false);
    }
  };

  const handleAvatarFromUrl = () => {
    if (!avatarUrlInput) {
      setMessage({ type: 'error', text: 'URL tidak boleh kosong' });
      return;
    }

    // Validasi URL
    try {
      new URL(avatarUrlInput);
    } catch (e) {
      setMessage({ type: 'error', text: 'URL tidak valid' });
      return;
    }

    setAvatarUrl(avatarUrlInput);
    setAvatar(null);
    setShowUrlInput(false);
    setMessage({ type: 'success', text: 'Foto profil dari URL telah diatur' });
  };
  
  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
    setAvatar(null);
    setAvatarUrlInput('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      const supabase = createBrowserSupabaseClient();
      
      // Upload avatar if changed
      let newAvatarUrl = profile?.avatar_url;
      
      if (avatar) {
        const fileExt = avatar.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatar);
          
        if (uploadError) {
          throw new Error(`Error uploading avatar: ${uploadError.message}`);
        }
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
          
        newAvatarUrl = urlData.publicUrl;
      } else if (avatarUrl !== profile?.avatar_url) {
        // Jika avatar diubah menggunakan URL eksternal atau dihapus
        newAvatarUrl = avatarUrl;
      }
      
      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
        
      if (updateError) {
        throw new Error(`Error updating profile: ${updateError.message}`);
      }
      
      await refreshUser();
      setMessage({ type: 'success', text: 'Profil berhasil diperbarui' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Terjadi kesalahan saat memperbarui profil' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleResetPassword = async () => {
    if (!user?.email) return;
    
    setResetPasswordLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const supabase = createBrowserSupabaseClient();
      
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });
      
      if (error) {
        throw error;
      }
      
      setResetPasswordSent(true);
      setMessage({ 
        type: 'success', 
        text: 'Email untuk reset password telah dikirim. Silakan periksa inbox email Anda.' 
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim reset password' 
      });
    } finally {
      setResetPasswordLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container-custom py-10">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-10">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Profil Saya</h1>
        
        {message.text && (
          <div className={`mb-4 p-3 rounded ${
            message.type === 'error' 
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          }`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-8 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              {avatarUrl ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={avatarUrl}
                    alt="Avatar profil"
                    fill
                    className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    title="Hapus foto profil"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="flex space-x-2">
                <label htmlFor="avatar" className="btn-secondary cursor-pointer">
                  Upload Foto
                </label>
                <input 
                  type="file" 
                  id="avatar" 
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden" 
                />
                
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="btn-secondary"
                >
                  Foto dari URL
                </button>
              </div>
              
              {showUrlInput && (
                <div className="flex w-full mt-2">
                  <input
                    type="text"
                    value={avatarUrlInput}
                    onChange={(e) => setAvatarUrlInput(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAvatarFromUrl}
                    className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors"
                  >
                    Terapkan
                  </button>
                </div>
              )}
              
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Format: JPG, PNG, GIF (Max 2MB)
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Nama lengkap Anda"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full md:flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
              />
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={resetPasswordLoading || resetPasswordSent}
                className="mt-2 md:mt-0 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetPasswordLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                    Mengirim...
                  </span>
                ) : resetPasswordSent ? (
                  'Email Terkirim'
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Email tidak dapat diubah
            </p>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin inline-block h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                  Menyimpan...
                </>
              ) : (
                'Simpan Perubahan'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}