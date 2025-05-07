import React from 'react';
import { getCanteenById } from '@/app/utils/api';
import CanteenForm from '@/app/components/admin/CanteenForm';
import { notFound } from 'next/navigation';

export default async function EditCanteenPage({ params }: { params: { id: string } }) {
  const canteen = await getCanteenById(params.id);
  
  if (!canteen) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Canteen</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <CanteenForm canteen={canteen} isEditing={true} />
      </div>
    </div>
  );
} 