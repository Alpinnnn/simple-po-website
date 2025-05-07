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

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((food) => (
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