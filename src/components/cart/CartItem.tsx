"use client";

import type { CartItem as CartItemType } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, Package } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity);
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-border bg-card rounded-lg shadow-sm mb-4">
      {item.product.imageUrl ? (
        <Image
          src={item.product.imageUrl}
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
          ${item.product.price.toFixed(2)} each
        </p>
         {item.product.storeName && (
          <p className="text-xs text-accent">From: {item.product.storeName}</p>
        )}
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
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
          className="w-16 text-center h-9"
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
        ${(item.product.price * item.quantity).toFixed(2)}
      </p>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeFromCart(item.product.id)}
        className="text-destructive hover:bg-destructive/10"
        aria-label="Remove item from cart"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
