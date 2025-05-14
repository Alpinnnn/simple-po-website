import ProductCard from './ProductCard';
import type { FoodProduct, Canteen } from '@/types';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { unstable_noStore as noStore } from 'next/cache';

// Interface untuk produk yang sudah termasuk data kantin
interface ProductWithCanteen extends Omit<FoodProduct, 'canteen_id'> {
  canteen_id: string | null;
  canteen?: Canteen;
}

async function getProductsWithCanteens(): Promise<ProductWithCanteen[]> {
  // Prevent caching of this data
  noStore();
  
  // Use the server client
  const supabase = getSupabaseServerClient();

  // Mengambil semua produk dengan join ke tabel kantin tanpa filter is_available
  const { data, error } = await supabase
    .from('foods')
    .select(`
      *,
      canteen:canteens(*)
    `);

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

  // Mengurutkan produk - produk tersedia ditampilkan lebih dulu
  const sortedProducts = [...productsWithCanteens].sort((a, b) => {
    // Produk yang tersedia (is_available === true) akan berada di depan
    if (a.is_available === true && b.is_available !== true) return -1;
    if (a.is_available !== true && b.is_available === true) return 1;
    
    // Jika keduanya sama-sama tersedia atau tidak tersedia, urutkan berdasarkan nama
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
