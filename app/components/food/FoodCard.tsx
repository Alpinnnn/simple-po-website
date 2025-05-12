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
  const formattedPrice = price.toLocaleString('id-ID');

  return (
    <div className={`card group hover:shadow-xl hover:transform hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col ${!isAvailable ? 'opacity-85' : ''}`}>
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={imageUrl || '/images/default-food.jpg'}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          quality={85}
        />
        
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-white font-medium px-4 py-1.5 bg-danger/90 rounded-full text-sm shadow-lg">
              Tidak Tersedia
            </span>
          </div>
        )}
        
        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center">
          {isAvailable && (
            <div className="bg-accent/90 text-accent-dark backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium shadow-md">
              Tersedia
            </div>
          )}
          <div className="ml-auto bg-white/90 dark:bg-gray-800/90 rounded-full px-3 py-2 text-sm font-bold shadow-md text-primary-dark dark:text-primary backdrop-blur-sm">
            Rp {formattedPrice}
          </div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-2 flex-grow">{description}</p>
        
        <button
          onClick={() => onOrder(id)}
          disabled={!isAvailable}
          className={`mt-auto w-full py-3 rounded-lg text-sm font-medium transition-all ${
            isAvailable
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 text-white group-hover:shadow-md'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {isAvailable ? (
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Pesan Sekarang
            </span>
          ) : (
            'Tidak Tersedia'
          )}
        </button>
      </div>
    </div>
  );
} 