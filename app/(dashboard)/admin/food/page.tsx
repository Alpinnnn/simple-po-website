import React from 'react';
import { getCanteens, getFoodsByCanteen } from '@/app/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Food } from '@/app/utils/supabase-types';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ManageFoodPage({ searchParams }: Props) {
  const canteens = await getCanteens();
  
  if (canteens.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Kelola Menu Makanan</h1>
        <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Buat Kantin Terlebih Dahulu</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Anda perlu membuat setidaknya satu kantin sebelum menambahkan menu makanan. Kantin diperlukan untuk mengorganisir menu makanan Anda.
          </p>
          <Link
            href="/admin/canteens/new"
            className="btn-primary inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 rounded-lg px-5 py-2.5 text-white shadow-sm hover:shadow-md transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Buat Kantin
          </Link>
        </div>
      </div>
    );
  }

  // Handle specific canteen filter - fix the type and access to avoid the error
  const selectedCanteenId = typeof searchParams.canteen === 'string' ? searchParams.canteen : undefined;
  let foods: Food[] = [];
  let selectedCanteen;
  
  if (selectedCanteenId) {
    selectedCanteen = canteens.find(c => c.id === selectedCanteenId);
    if (!selectedCanteen) {
      notFound();
    }
    foods = await getFoodsByCanteen(selectedCanteenId);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {selectedCanteen ? `Menu - ${selectedCanteen.name}` : 'Kelola Menu Makanan'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {selectedCanteen 
              ? `Kelola menu makanan untuk ${selectedCanteen.name}`
              : 'Pilih kantin untuk mengelola menu makanannya'}
          </p>
        </div>
        {selectedCanteenId && (
          <Link
            href={`/admin/food/new${selectedCanteenId ? `?canteen=${selectedCanteenId}` : ''}`}
            className="btn-primary inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 rounded-lg px-4 py-2.5 text-white shadow-sm hover:shadow-md transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Menu Baru
          </Link>
        )}
      </div>

      {!selectedCanteenId && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Pilih Kantin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {canteens.map((canteen) => (
              <Link
                key={canteen.id}
                href={`/admin/food?canteen=${canteen.id}`}
                className="group p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-md transition-all flex items-center"
              >
                <div className="mr-4 h-14 w-14 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  {canteen.image_url ? (
                    <div className="relative h-14 w-14 rounded-lg overflow-hidden">
                      <Image
                        src={canteen.image_url}
                        alt={canteen.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{canteen.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Kelola menu makanan kantin ini
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {selectedCanteenId && (
        <>
          <div className="mb-6">
            <Link href="/admin/food" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke semua kantin
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Nama Menu
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Harga
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {foods.map((food) => (
                    <tr key={food.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {food.image_url ? (
                            <div className="flex-shrink-0 h-12 w-12 mr-4 relative rounded-lg overflow-hidden">
                              <Image
                                src={food.image_url}
                                alt={food.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 h-12 w-12 mr-4 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-800 dark:text-white">{food.name}</div>
                            {food.description && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 max-w-xs">
                                {food.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-500 dark:text-blue-400">
                          Rp {food.price.toLocaleString('id-ID')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-medium rounded-full ${
                          food.is_available 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                        }`}>
                          {food.is_available ? 'Tersedia' : 'Tidak Tersedia'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/food/edit/${food.id}${selectedCanteenId ? `?canteen=${selectedCanteenId}` : ''}`}
                          className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-md transition-colors inline-flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}

                  {foods.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Belum Ada Menu</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md text-center">
                            Kantin ini belum memiliki menu makanan. Tambahkan menu makanan baru untuk mulai menerima pesanan.
                          </p>
                          <Link 
                            href={`/admin/food/new${selectedCanteenId ? `?canteen=${selectedCanteenId}` : ''}`} 
                            className="btn-primary inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 rounded-lg px-5 py-2.5 text-white shadow-sm hover:shadow-md transition-all"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Tambah Menu Makanan
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 