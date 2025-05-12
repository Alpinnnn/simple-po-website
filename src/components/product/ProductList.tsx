import ProductCard from './ProductCard';
import type { FoodProduct, Canteen } from '@/types';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';

// Interface untuk produk yang sudah termasuk data kantin
interface ProductWithCanteen extends Omit<FoodProduct, 'canteen_id'> {
  canteen_id: string | null;
  canteen?: Canteen;
}

async function getProductsWithCanteens(): Promise<ProductWithCanteen[]> {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Mengambil produk dengan join ke tabel kantin
  const { data, error } = await supabase
    .from('foods')
    .select(`
      *,
      canteen:canteens(*)
    `)
    .eq('is_available', true);

  if (error) {
    console.error('Error fetching products with canteens:', error);
    return [];
  }

  // Transformasi data ke format yang diharapkan
  return data as ProductWithCanteen[];
}

export default async function ProductList() {
  const productsWithCanteens = await getProductsWithCanteens();

  if (!productsWithCanteens || productsWithCanteens.length === 0) {
    return <p className="text-center text-muted-foreground">No products available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productsWithCanteens.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
