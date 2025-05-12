import { mockStores } from '@/data/mock';
import StoreCard from './StoreCard';
import type { Store } from '@/types';

async function getStores(): Promise<Store[]> {
  // In a real app, this would fetch data from an API
  return Promise.resolve(mockStores);
}

export default async function StoreList() {
  const stores = await getStores();

  if (!stores || stores.length === 0) {
    return <p className="text-center text-muted-foreground">No stores available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
}
