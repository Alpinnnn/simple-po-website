import React from 'react';
import { getCanteens } from '@/app/utils/api';
import Link from 'next/link';

export default async function AdminDashboard() {
  const canteens = await getCanteens();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Canteens</h2>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{canteens.length}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">Total canteens in the system</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent-light to-white dark:from-accent dark:to-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Foods</h2>
              <p className="text-3xl font-bold text-accent-dark dark:text-accent-light">0</p>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">Total food items available</p>
            </div>
            <div className="bg-accent dark:bg-accent-dark/50 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-dark dark:text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Orders</h2>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">0</p>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">Total orders processed</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Canteens</h2>
            <Link href="/admin/canteens" className="text-sm text-blue-500 dark:text-blue-400 hover:underline flex items-center">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    WhatsApp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                {canteens.slice(0, 5).map((canteen) => (
                  <tr key={canteen.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/admin/canteens/${canteen.id}`} className="text-blue-500 dark:text-blue-400 hover:underline">
                        {canteen.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{canteen.whatsapp_number || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(canteen.created_at).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}

                {canteens.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        No canteens found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              href="/admin/canteens/new" 
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
            >
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">Add New Canteen</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Create a new canteen profile</div>
              </div>
            </Link>
            
            <Link 
              href="/admin/food/new" 
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
            >
              <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400">Add New Food</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Add a food item to a canteen</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 