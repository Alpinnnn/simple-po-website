import ProductCard from './ProductCard';
import type { FoodProduct } from '@/types';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';

async function getProducts(): Promise<FoodProduct[]> {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .eq('is_available', true); // Optionally, only fetch available products

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  // Map Supabase data to FoodProduct type if necessary.
  // Ensure your FoodProduct type in src/types/index.ts matches the 'foods' table structure.
  return data as FoodProduct[];
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
