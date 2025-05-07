import React from 'react';
import { getCanteens } from '@/app/utils/api';
import Link from 'next/link';

export default async function ManageCanteens() {
  const canteens = await getCanteens();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Canteens</h1>
        <Link
          href="/admin/canteens/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Canteen
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
                WhatsApp Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {canteens.map((canteen) => (
              <tr key={canteen.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {canteen.image_url && (
                      <div className="flex-shrink-0 h-10 w-10 mr-3">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={canteen.image_url}
                          alt={canteen.name}
                        />
                      </div>
                    )}
                    <div className="text-sm font-medium text-gray-900">{canteen.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{canteen.whatsapp_number}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(canteen.created_at).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/canteens/edit/${canteen.id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/admin/food?canteen=${canteen.id}`}
                    className="text-green-600 hover:text-green-900"
                  >
                    Manage Menu
                  </Link>
                </td>
              </tr>
            ))}

            {canteens.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No canteens found. <Link href="/admin/canteens/new" className="text-indigo-600 hover:underline">Add one</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 