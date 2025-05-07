import React from 'react';
import CanteenForm from '@/app/components/admin/CanteenForm';

export default function NewCanteenPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Canteen</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <CanteenForm />
      </div>
    </div>
  );
} 