import React from 'react';
import { getCanteens } from '@/app/utils/api';

export default async function AdminDashboard() {
  const canteens = await getCanteens();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Canteens</h2>
          <p className="text-3xl font-bold text-indigo-600">{canteens.length}</p>
          <p className="text-gray-600 mt-2">Total canteens in the system</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/admin/canteens/new" className="text-indigo-600 hover:underline">
                Add New Canteen
              </a>
            </li>
            <li>
              <a href="/admin/food/new" className="text-indigo-600 hover:underline">
                Add New Food Item
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Canteens</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {canteens.slice(0, 5).map((canteen) => (
                <tr key={canteen.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{canteen.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{canteen.whatsapp_number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(canteen.created_at).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}

              {canteens.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                    No canteens found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 