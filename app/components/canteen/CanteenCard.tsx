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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || '/images/default-canteen.jpg'}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
        <Link
          href={`/canteen/${id}`}
          className="mt-3 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
} 