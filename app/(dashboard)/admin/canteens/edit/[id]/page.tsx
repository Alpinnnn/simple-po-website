import React from 'react';
import { getCanteenById } from '@/app/utils/api';
import CanteenForm from '@/app/components/admin/CanteenForm';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditCanteenPage({ params }: PageProps) {
  try {
    const canteen = await getCanteenById(params.id);
    
    if (!canteen) {
      notFound();
    }

    return (
      <div className="container-custom py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Canteen</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 p-6">
          <CanteenForm canteen={canteen} isEditing={true} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in EditCanteenPage:', error);
    notFound();
  }
} 