import React from 'react';
import { getCanteens } from '@/app/utils/api';
import FoodForm from '@/app/components/admin/FoodForm';
import { createServerClient } from '@/app/lib/supabase';
import { notFound } from 'next/navigation';
import { Food } from '@/app/utils/supabase-types';

async function getFoodById(id: string): Promise<Food | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching food:', error);
    return null;
  }
  
  return data as Food;
}

export default async function EditFoodPage({ params }: { params: { id: string } }) {
  const [food, canteens] = await Promise.all([
    getFoodById(params.id),
    getCanteens()
  ]);
  
  if (!food) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Food Item</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <FoodForm food={food} canteens={canteens} isEditing={true} />
      </div>
    </div>
  );
} 