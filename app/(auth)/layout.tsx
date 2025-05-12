import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-light dark:bg-gray-800/80 bg-gradient-to-br from-primary-light to-secondary-light dark:from-primary dark:to-secondary-dark">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-secondary dark:border-gray-700">
        {children}
      </div>
    </div>
  );
} 