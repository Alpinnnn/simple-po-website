'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/app/lib/supabase';
import { Canteen } from '@/app/utils/supabase-types';

interface CanteenFormProps {
  canteen?: Canteen;
  isEditing?: boolean;
}

export default function CanteenForm({ canteen, isEditing = false }: CanteenFormProps) {
  const [name, setName] = useState(canteen?.name || '');
  const [description, setDescription] = useState(canteen?.description || '');
  const [whatsappNumber, setWhatsappNumber] = useState(canteen?.whatsapp_number || '');
  const [imageUrl, setImageUrl] = useState(canteen?.image_url || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return; // Prevent multiple submissions
    
    setLoading(true);
    setError(null);

    try {
      if (isEditing && canteen) {
        // Update existing canteen
        const { error: updateError } = await supabase
          .from('canteens')
          .update({
            name,
            description,
            whatsapp_number: whatsappNumber,
            image_url: imageUrl,
          })
          .eq('id', canteen.id);

        if (updateError) throw updateError;
      } else {
        // Insert new canteen
        const { error: insertError } = await supabase
          .from('canteens')
          .insert({
            name,
            description,
            whatsapp_number: whatsappNumber,
            image_url: imageUrl,
          });

        if (insertError) throw insertError;
      }

      // Immediately show success message and disable the form before navigation
      const successMessage = document.createElement('div');
      successMessage.className = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 p-4 rounded-md mb-4';
      successMessage.textContent = isEditing ? 'Canteen updated successfully!' : 'Canteen created successfully!';
      
      const form = document.querySelector('form');
      if (form && form.parentNode) {
        form.parentNode.insertBefore(successMessage, form);
      }
      
      // Use a short timeout to ensure the success message is visible
      setTimeout(() => {
        // Use window.location for a full page reload
        window.location.href = '/admin/canteens';
      }, 800);
      
    } catch (err: any) {
      console.error('Error saving canteen:', err);
      setError(err.message || 'An error occurred while saving the canteen');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 p-4 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Canteen Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
        />
      </div>

      <div>
        <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          WhatsApp Number *
        </label>
        <input
          type="text"
          id="whatsappNumber"
          required
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          placeholder="e.g. 628123456789"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Include country code without + (e.g., 628123456789)
        </p>
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
        />
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={() => router.push('/admin/canteens')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Canteen' : 'Create Canteen'}
        </button>
      </div>
    </form>
  );
} 