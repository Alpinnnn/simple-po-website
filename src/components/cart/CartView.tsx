// src/components/cart/CartView.tsx
"use client";

import type { CartItem as CartItemType } from '@/types'; // Ensure this import is present
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { cn } from "@/lib/utils";
import { formatCurrency } from '@/lib';

interface CartViewProps {
  isModal?: boolean;
}

export default function CartView({ isModal = false }: CartViewProps) {
  const { cartItems, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className={cn("text-center", isModal ? "py-6" : "py-10")}>
        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild variant="default">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  // Modal rendering: simpler list, no Card wrapper, no total/footer (handled by CartModal)
  if (isModal) {
    return (
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
        {cartItems.length > 0 && (
          <div className="flex justify-end pt-4">
             <Button variant="outline" onClick={clearCart} className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
              Clear Cart
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Original rendering for a page context (fallback, though not used anymore)
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Your Items</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {cartItems.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/50 rounded-b-lg">
        <Button variant="outline" onClick={clearCart} className="w-full sm:w-auto border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
          Clear Cart
        </Button>
        <div className="text-right">
          <p className="text-xl font-bold text-primary">
            Total: {formatCurrency(getCartTotal())}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
