// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { Package } from 'lucide-react';

export default function Header() {
  return (
    <>
      {/* Header background is primary (#c3d6f2), text is primary-foreground (dark) */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-2 group">
              {/* Icon color should contrast with bg-primary. primary-foreground is good. */}
              <Package className="h-8 w-8 text-primary-foreground group-hover:animate-pulse" />
              {/* Text color is inherited primary-foreground, which is good. */}
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                PKK-ku
              </h1>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
