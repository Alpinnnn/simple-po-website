"use client";

import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CartModal from '@/components/cart/CartModal';
import { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

export default function FloatingCartButton() {
  const { getTotalItems, cartItems } = useCart();
  const totalItems = getTotalItems();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevItemsCountRef = useRef(totalItems);

  // Efek untuk mendeteksi perubahan jumlah item dan memicu animasi
  useEffect(() => {
    if (totalItems > prevItemsCountRef.current) {
      // Item baru ditambahkan
      setIsAnimating(true);
      
      // Hentikan animasi setelah 1 detik
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
    
    prevItemsCountRef.current = totalItems;
  }, [totalItems]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="default"
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300",
            isAnimating && "animate-bounce shadow-xl shadow-primary/30"
          )}
          onClick={() => setIsCartModalOpen(true)}
          aria-label="Open shopping cart"
        >
          <ShoppingCartIcon className={cn(
            "h-6 w-6 text-primary-foreground transition-transform",
            isAnimating && "scale-110"
          )} />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className={cn(
                "absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full p-1 text-xs transition-all",
                isAnimating && "scale-125"
              )}
            >
              {totalItems}
            </Badge>
          )}
          <span className="sr-only">View Cart ({totalItems} items)</span>
        </Button>
      </div>
      <CartModal isOpen={isCartModalOpen} onOpenChange={setIsCartModalOpen} />
    </>
  );
} 