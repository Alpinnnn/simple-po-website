"use client";

import type { FoodProduct, Canteen } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Tag, Package, Store, XCircle } from 'lucide-react'; // Menambahkan ikon XCircle
import { formatCurrency } from '@/lib';
import { cn } from '@/lib/utils'; // Import utility function untuk menggabungkan class

// Mendefinisikan ProductWithCanteen
interface ProductWithCanteen extends Omit<FoodProduct, 'canteen_id'> {
  canteen_id: string | null;
  canteen?: Canteen;
}

interface ProductCardProps {
  product: ProductWithCanteen;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const isAvailable = product.is_available === true;

  // Mengkonversi ke FoodProduct untuk addToCart
  const productForCart: FoodProduct = {
    id: product.id,
    canteen_id: product.canteen_id || '',
    name: product.name,
    price: product.price,
    description: product.description,
    image_url: product.image_url,
    is_available: product.is_available,
    created_at: product.created_at
  };

  return (
    <Card className={cn(
      "flex flex-col overflow-hidden shadow-lg transition-shadow duration-300 h-full bg-card text-card-foreground product-card",
      isAvailable ? "hover:shadow-xl" : "opacity-75 grayscale cursor-not-allowed"
    )}>
      <CardHeader className="p-0 relative">
        {product.image_url ? (
          <div className="relative">
            <Image
              src={product.image_url}
              alt={product.name}
              width={400}
              height={250}
              className={cn(
                "w-full h-48 object-cover",
                !isAvailable && "filter blur-[1px]"
              )}
              data-ai-hint="product item"
            />
            {!isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="bg-destructive text-destructive-foreground font-bold px-3 py-1 rounded-md flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  Unavailable
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center relative">
            <Package className="h-16 w-16 text-muted-foreground" />
            {!isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="bg-destructive text-destructive-foreground font-bold px-3 py-1 rounded-md flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  Unavailable
                </div>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 text-primary">{product.name}</CardTitle>
        
        {/* Menampilkan nama kantin */}
        {product.canteen && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Store className="h-3 w-3" />
            <span>{product.canteen.name}</span>
          </div>
        )}
        
        <CardDescription className="text-sm mb-2 h-16 overflow-y-auto text-muted-foreground">
          {product.description || "No description available."}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
        <p className="text-lg font-bold text-primary flex items-center">
          <Tag className="h-5 w-5 mr-1 text-foreground" />
          {formatCurrency(product.price)}
        </p>
        <Button 
          onClick={() => isAvailable && addToCart(productForCart)} 
          size="sm" 
          variant={isAvailable ? "default" : "outline"} 
          disabled={!isAvailable}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAvailable ? "Add to Cart" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
}
