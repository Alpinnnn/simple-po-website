import React from 'react';
import { getCanteenById, getFoodsByCanteen } from '@/app/utils/api';
import FoodsList from '@/app/components/food/FoodsList';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CanteenPage({ params }: { params: { id: string } }) {
  const canteen = await getCanteenById(params.id);
  
  if (!canteen) {
    notFound();
  }
  
  const foods = await getFoodsByCanteen(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-indigo-600 hover:text-indigo-800">
          ← Back to Canteens
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{canteen.name}</h1>
        {canteen.description && (
          <p className="text-gray-600">{canteen.description}</p>
        )}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Foods</h2>
      
      {foods.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No food items available at this canteen.</p>
        </div>
      ) : (
        <FoodsList foods={foods} canteen={canteen} />
      )}
    </div>
  );
} 