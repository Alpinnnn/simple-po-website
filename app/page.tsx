import React from 'react';
import { getCanteens } from './utils/api';
import CanteenCard from './components/canteen/CanteenCard';

export default async function Home() {
  const canteens = await getCanteens();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Food Pre-Order System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our canteens and pre-order your favorite food
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Canteens</h2>
        
        {canteens.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No canteens available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {canteens.map((canteen) => (
              <CanteenCard
                key={canteen.id}
                id={canteen.id}
                name={canteen.name}
                description={canteen.description || ''}
                imageUrl={canteen.image_url || ''}
          />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
