import React from 'react';
import { getCanteenById, getFoodsByCanteen } from '@/app/utils/api';
import FoodsList from '@/app/components/food/FoodsList';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CanteenPage({ params }: PageProps) {
  // In Next.js 14, we need to handle params differently
  // We'll directly use the id with proper error handling
  try {
    const canteen = await getCanteenById(params.id);
    
    if (!canteen) {
      notFound();
    }
    
    const foods = await getFoodsByCanteen(params.id);

    return (
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="container-custom py-8">
          <div className="mb-6">
            <Link href="/" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Kembali ke Daftar Kantin</span>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
            <div className="relative h-48 sm:h-64 w-full">
              {canteen.image_url ? (
                <Image
                  src={canteen.image_url}
                  alt={canteen.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{canteen.name}</h1>
                {canteen.description && (
                  <p className="text-gray-200 text-lg max-w-3xl">{canteen.description}</p>
                )}
              </div>
            </div>
            
            {canteen.whatsapp_number && (
              <div className="px-6 sm:px-8 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center">
                <div className="flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>{canteen.whatsapp_number}</span>
                </div>
                <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                  Pesan melalui WhatsApp
                </div>
              </div>
            )}
          </div>

          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Menu Tersedia
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Pilih menu favorit Anda dari {canteen.name}</p>
            </div>
            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium text-sm">
              {foods.length} Menu Tersedia
            </div>
          </div>
          
          {foods.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Belum ada menu tersedia di kantin ini.</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Silakan kembali lagi nanti.</p>
            </div>
          ) : (
            <FoodsList foods={foods} canteen={canteen} />
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in CanteenPage:', error);
    notFound();
  }
} 