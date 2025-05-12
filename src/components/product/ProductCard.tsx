"use client";

import type { Product } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0 relative">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            data-ai-hint="product item"
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1">{product.name}</CardTitle>
        {product.storeName && (
          <CardDescription className="text-xs text-accent mb-2">
            From: {product.storeName}
          </CardDescription>
        )}
        <CardDescription className="text-sm mb-2 h-16 overflow-y-auto">{product.description}</CardDescription>
        
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
        <p className="text-lg font-bold text-primary flex items-center">
          <Tag className="h-5 w-5 mr-1 text-foreground" />
          ${product.price.toFixed(2)}
        </p>
        <Button onClick={() => addToCart(product)} size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
