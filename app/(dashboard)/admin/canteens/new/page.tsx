import React from 'react';
import CanteenForm from '@/app/components/admin/CanteenForm';

export default function NewCanteenPage() {
  return (
    <div className="container-custom py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add New Canteen</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 p-6">
        <CanteenForm />
      </div>
    </div>
  );
} 