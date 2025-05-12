// src/components/cart/CartItem.tsx
"use client";

import type { CartItem as CartItemType } from '@/types'; // CartItem now internally uses FoodProduct
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, Package } from 'lucide-react';
import type { JSX } from 'react'; 
import { formatCurrency, formatSimpleCurrency } from '@/lib/currency';

interface CartItemProps {
  item: CartItemType; // This item.product is now FoodProduct
}

export default function CartItem({ item }: CartItemProps): JSX.Element {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    const quantityToUpdate = Math.max(1, newQuantity);
    updateQuantity(item.product.id, quantityToUpdate);
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b last:border-b-0 border-border bg-card rounded-lg shadow-sm text-card-foreground">
      {item.product.image_url ? ( // Changed from imageUrl to image_url
        <Image
          src={item.product.image_url}
          alt={item.product.name}
          width={80}
          height={80}
          className="rounded-md object-cover"
          data-ai-hint="product thumbnail"
        />
      ) : (
         <div className="w-20 h-20 bg-muted flex items-center justify-center rounded-md">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
      )}
      <div className="flex-grow">
        <h3 className="font-semibold text-card-foreground">{item.product.name}</h3>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(item.product.price)} each
        </p>
         {/* item.product.storeName is removed as FoodProduct doesn't have it.
             If you need Canteen Name, it would require different data structure or fetching.
         */}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val)) handleQuantityChange(val);
          }}
          className="w-16 text-center h-9 bg-input text-foreground" // Ensure input also uses theme colors
          min="1"
          aria-label="Item quantity"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="font-semibold w-20 text-right text-primary">
        {formatCurrency(item.product.price * item.quantity)}
      </p>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeFromCart(item.product.id)}
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        aria-label="Remove item from cart"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
