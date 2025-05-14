import StoreCard from './StoreCard';
import type { Canteen } from '@/types';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { unstable_noStore as noStore } from 'next/cache';

// This function will run on the server.
async function getCanteens(): Promise<Canteen[]> {
  // Prevent caching of this data
  noStore();
  
  // Use the server client
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from('canteens')
    .select('*');

  if (error) {
    console.error('Error fetching canteens:', error);
    return [];
  }
  // Map Supabase data to Canteen type if necessary, though direct compatibility is preferred.
  // Ensure your Canteen type in src/types/index.ts matches the 'canteens' table structure.
  return data as Canteen[];
}

export default async function StoreList() {
  const canteens = await getCanteens();

  if (!canteens || canteens.length === 0) {
    return <p className="text-center text-muted-foreground">No canteens available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {canteens.map((canteen) => (
        <StoreCard key={canteen.id} canteen={canteen} />
      ))}
    </div>
  );
}
