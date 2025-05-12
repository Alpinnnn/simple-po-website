import type { Store } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, Building2 } from 'lucide-react';

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-4">
          {store.logoUrl ? (
            <Image
              src={store.logoUrl}
              alt={`${store.name} logo`}
              width={60}
              height={60}
              className="rounded-full border border-border"
              data-ai-hint="store logo"
            />
          ) : (
            <div className="p-3 rounded-full bg-secondary">
              <Building2 className="h-8 w-8 text-secondary-foreground" />
            </div>
          )}
          <div>
            <CardTitle className="text-xl font-semibold">{store.name}</CardTitle>
            {store.description && <CardDescription className="text-sm mt-1">{store.description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      {(store.contactInfo.phone || store.contactInfo.address) && (
        <CardContent className="p-4 pt-0">
          <div className="space-y-2 text-sm text-muted-foreground">
            {store.contactInfo.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>{store.contactInfo.phone}</span>
              </div>
            )}
            {store.contactInfo.address && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{store.contactInfo.address}</span>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
