import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800/80 bg-gradient-to-br from-blue-50 to-gray-50 dark:from-blue-900/10 dark:to-gray-800/90">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        {children}
      </div>
    </div>
  );
} 