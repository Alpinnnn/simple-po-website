
export interface Canteen {
  id: string; // uuid
  name: string; // text NOT NULL
  description?: string; // text
  whatsapp_number: string; // text NOT NULL
  image_url?: string; // text (logo for canteen)
  created_at?: string; // timestamp with time zone
}

export interface FoodProduct {
  id: string; // uuid
  canteen_id: string; // uuid REFERENCES public.canteens(id)
  name: string; // text NOT NULL
  price: number; // numeric(10,2) NOT NULL
  description?: string; // text
  image_url?: string; // text
  is_available?: boolean; // boolean DEFAULT true
  created_at?: string; // timestamp with time zone
}

// CartItem references FoodProduct now
export interface CartItem {
  product: FoodProduct;
  quantity: number;
}

// Kept original Product and Store types for compatibility if they are used elsewhere,
// but new code should use Canteen and FoodProduct for Supabase data.
// Consider refactoring existing components if they use these old types for Supabase data.

export interface Store {
  id: string;
  name: string;
  contactInfo: {
    phone?: string;
    address?: string;
  };
  logoUrl?: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  storeId: string;
  storeName?: string; 
}
