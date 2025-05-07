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
    setLoading(true);
    setError(null);

    try {
      if (isEditing && canteen) {
        // Update existing canteen
        const { error } = await supabase
          .from('canteens')
          .update({
            name,
            description,
            whatsapp_number: whatsappNumber,
            image_url: imageUrl,
          })
          .eq('id', canteen.id);

        if (error) throw error;
      } else {
        // Insert new canteen
        const { error } = await supabase
          .from('canteens')
          .insert({
            name,
            description,
            whatsapp_number: whatsappNumber,
            image_url: imageUrl,
          });

        if (error) throw error;
      }

      router.push('/admin/canteens');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the canteen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Canteen Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
          WhatsApp Number *
        </label>
        <input
          type="text"
          id="whatsappNumber"
          required
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          placeholder="e.g. 628123456789"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Include country code without + (e.g., 628123456789)
        </p>
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push('/admin/canteens')}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Canteen' : 'Create Canteen'}
        </button>
      </div>
    </form>
  );
} 