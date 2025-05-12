// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { ShoppingCart as ShoppingCartIcon, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CartModal from '@/components/cart/CartModal';
import { useState } from 'react';

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

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
                OrderEase
              </h1>
            </Link>
            <Button
              variant="ghost"
              className="relative rounded-full p-2 hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground"
              onClick={() => setIsCartModalOpen(true)}
              aria-label="Open shopping cart"
            >
              {/* Icon color should contrast with bg-primary. primary-foreground is good. */}
              <ShoppingCartIcon className="h-7 w-7" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive" // Uses destructive (light red) bg and destructive-foreground (darker) text
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-1 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">View Cart ({totalItems} items)</span>
            </Button>
          </div>
        </div>
      </header>
      <CartModal isOpen={isCartModalOpen} onOpenChange={setIsCartModalOpen} />
    </>
  );
}
