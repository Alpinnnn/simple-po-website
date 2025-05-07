'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/app/lib/supabase';
import { Food, Canteen } from '@/app/utils/supabase-types';

interface FoodFormProps {
  food?: Food;
  isEditing?: boolean;
  canteens?: Canteen[];
}

export default function FoodForm({ food, isEditing = false, canteens = [] }: FoodFormProps) {
  const searchParams = useSearchParams();
  const preselectedCanteenId = searchParams.get('canteen');

  const [name, setName] = useState(food?.name || '');
  const [price, setPrice] = useState(food?.price?.toString() || '');
  const [description, setDescription] = useState(food?.description || '');
  const [imageUrl, setImageUrl] = useState(food?.image_url || '');
  const [canteenId, setCanteenId] = useState(food?.canteen_id || preselectedCanteenId || '');
  const [isAvailable, setIsAvailable] = useState(food?.is_available ?? true);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canteenId) {
      setError('Please select a canteen');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      if (isEditing && food) {
        // Update existing food
        const { error } = await supabase
          .from('foods')
          .update({
            name,
            price: parseFloat(price),
            description,
            image_url: imageUrl,
            canteen_id: canteenId,
            is_available: isAvailable,
          })
          .eq('id', food.id);

        if (error) throw error;
      } else {
        // Insert new food
        const { error } = await supabase
          .from('foods')
          .insert({
            name,
            price: parseFloat(price),
            description,
            image_url: imageUrl,
            canteen_id: canteenId,
            is_available: isAvailable,
          });

        if (error) throw error;
      }

      router.push(`/admin/food${canteenId ? `?canteen=${canteenId}` : ''}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the food item');
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
        <label htmlFor="canteenId" className="block text-sm font-medium text-gray-700">
          Canteen *
        </label>
        <select
          id="canteenId"
          value={canteenId}
          onChange={(e) => setCanteenId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select a canteen</option>
          {canteens.map((canteen) => (
            <option key={canteen.id} value={canteen.id}>
              {canteen.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Food Name *
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
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price (Rp) *
        </label>
        <input
          type="number"
          id="price"
          required
          min="0"
          step="1000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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

      <div className="flex items-center">
        <input
          id="isAvailable"
          name="isAvailable"
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
          Available for ordering
        </label>
      </div>

      <div className="flex items-center justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push(`/admin/food${canteenId ? `?canteen=${canteenId}` : ''}`)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Food Item' : 'Create Food Item'}
        </button>
      </div>
    </form>
  );
} 