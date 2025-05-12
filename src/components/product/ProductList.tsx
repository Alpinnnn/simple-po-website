import { mockProducts } from '@/data/mock';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

async function getProducts(): Promise<Product[]> {
  // In a real app, this would fetch data from an API
  return Promise.resolve(mockProducts);
}

export default async function ProductList() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return <p className="text-center text-muted-foreground">No products available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
