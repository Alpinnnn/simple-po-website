import StoreCard from './StoreCard';
import type { Canteen } from '@/types';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';

// This function will run on the server.
async function getCanteens(): Promise<Canteen[]> {
  // Create a Supabase client for server-side data fetching
  // For public data, anon key is sufficient.
  // Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your environment.
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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
