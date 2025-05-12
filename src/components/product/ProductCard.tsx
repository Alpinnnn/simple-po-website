"use client";

import type { FoodProduct } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Tag, Package } from 'lucide-react'; // Added Package for placeholder

interface ProductCardProps {
  product: FoodProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  // Explicitly type product for addToCart if CartContext expects the old Product type
  // This is a temporary workaround if CartContext is not yet updated.
  // Ideally, CartContext should also use FoodProduct.
  const productForCart: any = product;


  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full bg-card text-card-foreground">
      <CardHeader className="p-0 relative">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            data-ai-hint="product item"
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <Package className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 text-primary">{product.name}</CardTitle>
        {/* storeName is removed as it's not directly available in the FoodProduct from 'foods' table */}
        {/* If needed, canteen_id could be used to link to canteen details elsewhere */}
        <CardDescription className="text-sm mb-2 h-16 overflow-y-auto text-muted-foreground">{product.description || "No description available."}</CardDescription>
        
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
        <p className="text-lg font-bold text-primary flex items-center">
          <Tag className="h-5 w-5 mr-1 text-foreground" />
          ${product.price.toFixed(2)}
        </p>
        <Button onClick={() => addToCart(productForCart)} size="sm" variant="default"> {/* Ensure variant is appealing, e.g., default or primary */}
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
