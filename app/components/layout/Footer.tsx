import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold text-blue-500 dark:text-blue-400 flex items-center justify-center md:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6v12c0 1.6569 1.34315 3 3 3h8c1.6569 0 3-1.34315 3-3V9L13.5 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 3v6h6" />
              </svg>
              <span className="font-normal">Food</span><span className="font-bold">Order</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center md:text-left">
              Order your favorite food with ease
            </p>
          </div>
          <div className="flex space-x-8">
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Menu</h3>
              <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Legal</h3>
              <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} FoodOrder. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 