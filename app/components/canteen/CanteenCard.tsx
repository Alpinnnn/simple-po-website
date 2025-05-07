'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CanteenCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export default function CanteenCard({ id, name, description, imageUrl }: CanteenCardProps) {
  return (
    <div className="card group hover:shadow-xl hover:transform hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageUrl || '/images/default-canteen.jpg'}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
        
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold shadow-md text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white transition-colors">
            <span>Menu Tersedia</span>
          </div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-2 flex-grow">{description}</p>
        
        <Link
          href={`/canteen/${id}`}
          className="mt-auto inline-flex items-center justify-center btn-primary w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 py-3 rounded-lg group-hover:shadow-md transition-all"
        >
          <span className="mr-2">Lihat Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 