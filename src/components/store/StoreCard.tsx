import type { Canteen } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, Building2, MessageSquare } from 'lucide-react'; // Added MessageSquare for WhatsApp

interface StoreCardProps {
  canteen: Canteen;
}

export default function StoreCard({ canteen }: StoreCardProps) {
  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground">
      <CardHeader className="p-4">
        <div className="flex items-start space-x-4">
          {canteen.image_url ? (
            <Image
              src={canteen.image_url}
              alt={`${canteen.name} logo`}
              width={60}
              height={60}
              className="rounded-lg border border-border object-cover"
              data-ai-hint="store logo"
            />
          ) : (
            <div className="p-3 rounded-lg bg-muted flex items-center justify-center w-[60px] h-[60px]">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-primary">{canteen.name}</CardTitle>
            {canteen.description && <CardDescription className="text-sm mt-1 text-muted-foreground">{canteen.description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      {(canteen.whatsapp_number) && ( // Removed address check as it's not in Canteen type from DDL
        <CardContent className="p-4 pt-0">
          <div className="space-y-2 text-sm text-muted-foreground">
            {canteen.whatsapp_number && (
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-accent" />
                <a href={`https://wa.me/${canteen.whatsapp_number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent-foreground hover:underline">
                  {canteen.whatsapp_number}
                </a>
              </div>
            )}
            {/* Address field is not in the DDL for canteens, so it's removed. */}
            {/* If you add address to your canteens table, you can re-add it here. */}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
