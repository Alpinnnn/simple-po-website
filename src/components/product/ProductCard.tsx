"use client";

import type { FoodProduct, Canteen } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Tag, Package, Store } from 'lucide-react'; // Menambahkan ikon Store
import { formatCurrency } from '@/lib';

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
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full bg-card text-card-foreground product-card">
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
        <Button onClick={() => addToCart(productForCart)} size="sm" variant="default">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
