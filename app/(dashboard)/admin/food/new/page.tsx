import React from 'react';
import { getCanteens } from '@/app/utils/api';
import FoodForm from '@/app/components/admin/FoodForm';

export default async function NewFoodPage() {
  const canteens = await getCanteens();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Food Item</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <FoodForm canteens={canteens} />
      </div>
    </div>
  );
} 