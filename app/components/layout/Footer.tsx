import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Food Pre-Order
            </Link>
            <p className="text-gray-600 mt-2">
              Order your favorite food from our canteens
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-indigo-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-indigo-600">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Food Pre-Order System. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 