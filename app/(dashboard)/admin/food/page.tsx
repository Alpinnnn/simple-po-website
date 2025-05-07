import React from 'react';
import { getCanteens, getFoodsByCanteen } from '@/app/utils/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Food } from '@/app/utils/supabase-types';

export default async function ManageFoodPage({
  searchParams,
}: {
  searchParams: { canteen?: string };
}) {
  const canteens = await getCanteens();
  
  if (canteens.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Manage Food Items</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            You need to create at least one canteen before adding food items.
          </p>
          <Link
            href="/admin/canteens/new"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Create Canteen First
          </Link>
        </div>
      </div>
    );
  }

  // Handle specific canteen filter
  let selectedCanteenId = searchParams.canteen;
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {selectedCanteen ? `Food Items - ${selectedCanteen.name}` : 'Manage Food Items'}
        </h1>
        <Link
          href={`/admin/food/new${selectedCanteenId ? `?canteen=${selectedCanteenId}` : ''}`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Food Item
        </Link>
      </div>

      {!selectedCanteenId && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4">Select a Canteen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {canteens.map((canteen) => (
              <Link
                key={canteen.id}
                href={`/admin/food?canteen=${canteen.id}`}
                className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center"
              >
                <div>
                  <h3 className="font-medium">{canteen.name}</h3>
                  <p className="text-sm text-gray-500">
                    Manage food items for this canteen
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {selectedCanteenId && (
        <>
          <div className="mb-4">
            <Link href="/admin/food" className="text-indigo-600 hover:text-indigo-800">
              ← Back to all canteens
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {foods.map((food) => (
                  <tr key={food.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {food.image_url && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={food.image_url}
                              alt={food.name}
                            />
                          </div>
                        )}
                        <div className="text-sm font-medium text-gray-900">{food.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Rp {food.price.toLocaleString('en-US')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        food.is_available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {food.is_available ? 'Available' : 'Not Available'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/food/edit/${food.id}?canteen=${selectedCanteenId}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}

                {foods.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      No food items found for this canteen. <Link 
                        href={`/admin/food/new?canteen=${selectedCanteenId}`} 
                        className="text-indigo-600 hover:underline"
                      >
                        Add one
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
} 