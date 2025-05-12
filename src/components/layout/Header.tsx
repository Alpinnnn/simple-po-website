"use client";

import Link from 'next/link';
import { ShoppingCart as ShoppingCartIcon, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-secondary text-secondary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <Package className="h-8 w-8 text-primary group-hover:animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              OrderEase
            </h1>
          </Link>
          <Link href="/cart" passHref>
            <Button variant="ghost" className="relative rounded-full p-2 hover:bg-primary/20">
              <ShoppingCartIcon className="h-7 w-7 text-primary" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-1 text-xs bg-primary text-primary-foreground"
                >
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">View Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
