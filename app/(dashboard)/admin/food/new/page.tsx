import React from 'react';
import { getCanteens } from '@/app/utils/api';
import FoodForm from '@/app/components/admin/FoodForm';

export default async function NewFoodPage() {
  const canteens = await getCanteens();

  return (
    <div className="container-custom py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add New Food Item</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 p-6">
        <FoodForm canteens={canteens} />
      </div>
    </div>
  );
} 