'use client';

import React, { useState } from 'react';
import { Food, Canteen } from '@/app/utils/supabase-types';
import FoodCard from './FoodCard';
import WhatsAppOrderModal from '../order/WhatsAppOrderModal';

interface FoodsListProps {
  foods: Food[];
  canteen: Canteen;
}

export default function FoodsList({ foods, canteen }: FoodsListProps) {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleOrder = (id: string) => {
    const food = foods.find(f => f.id === id);
    if (food) {
      setSelectedFood(food);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFood(null);
  };

  // Separate available and unavailable foods
  const availableFoods = foods.filter(food => food.is_available);
  const unavailableFoods = foods.filter(food => !food.is_available);
  
  // Sort foods by name
  const sortedAvailableFoods = [...availableFoods].sort((a, b) => a.name.localeCompare(b.name));
  const sortedUnavailableFoods = [...unavailableFoods].sort((a, b) => a.name.localeCompare(b.name));
  
  // Combined sorted foods with available ones first
  const sortedFoods = [...sortedAvailableFoods, ...sortedUnavailableFoods];

  return (
    <div>
      {availableFoods.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {sortedAvailableFoods.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              description={food.description || ''}
              imageUrl={food.image_url || ''}
              isAvailable={food.is_available}
              onOrder={handleOrder}
            />
          ))}
        </div>
      )}
      
      {unavailableFoods.length > 0 && (
        <>
          <div className="border-t border-gray-200 dark:border-gray-700 my-10"></div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Menu Tidak Tersedia
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Menu-menu berikut sedang tidak tersedia saat ini
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-80">
            {sortedUnavailableFoods.map((food) => (
              <FoodCard
                key={food.id}
                id={food.id}
                name={food.name}
                price={food.price}
                description={food.description || ''}
                imageUrl={food.image_url || ''}
                isAvailable={food.is_available}
                onOrder={handleOrder}
              />
            ))}
          </div>
        </>
      )}

      {showModal && selectedFood && (
        <WhatsAppOrderModal
          food={selectedFood}
          canteen={canteen}
          onClose={closeModal}
        />
      )}
    </div>
  );
} 