'use client';

import React, { useState } from 'react';
import { Food, Canteen } from '@/app/utils/supabase-types';
import { useAuth } from '../providers/AuthProvider';

interface WhatsAppOrderModalProps {
  food: Food;
  canteen: Canteen;
  onClose: () => void;
}

export default function WhatsAppOrderModal({ food, canteen, onClose }: WhatsAppOrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const customerName = user?.user_metadata?.full_name || 'Customer';
    const message = encodeURIComponent(
      `*New Pre-Order from ${customerName}*\n\n` +
      `*Item:* ${food.name}\n` +
      `*Price:* Rp ${food.price.toLocaleString('en-US')}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Total:* Rp ${(food.price * quantity).toLocaleString('en-US')}\n` +
      `*Notes:* ${notes || '-'}\n\n` +
      'Thank you for your order!'
    );
    
    const whatsappUrl = `https://wa.me/${canteen.whatsapp_number.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Order Confirmation</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p className="font-medium text-gray-800 dark:text-white">{food.name}</p>
          <p className="text-blue-600 dark:text-blue-400 font-semibold">Rp {food.price.toLocaleString('en-US')}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{canteen.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementQuantity}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 text-center px-3 py-1 border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={incrementQuantity}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-r-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Special Instructions (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
              rows={3}
              placeholder="E.g., No onions, extra spicy, etc."
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                Rp {(food.price * quantity).toLocaleString('en-US')}
              </p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-white rounded-md shadow-sm flex items-center"
            >
              <span>Order via WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 