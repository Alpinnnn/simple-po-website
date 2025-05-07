'use client';

import React from 'react';
import Image from 'next/image';

interface FoodCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  onOrder: (id: string) => void;
}

export default function FoodCard({
  id,
  name,
  price,
  description,
  imageUrl,
  isAvailable,
  onOrder,
}: FoodCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || '/images/default-food.jpg'}
          alt={name}
          fill
          className="object-cover"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold px-3 py-1 bg-red-500 rounded-full">
              Not Available
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="text-indigo-600 font-bold">Rp {price.toLocaleString('en-US')}</span>
        </div>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
        <button
          onClick={() => onOrder(id)}
          disabled={!isAvailable}
          className={`mt-3 w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isAvailable
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isAvailable ? 'Order Now' : 'Not Available'}
        </button>
      </div>
    </div>
  );
} 