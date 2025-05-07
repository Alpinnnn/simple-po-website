export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'user' | 'admin';
  created_at: string;
}

export interface Canteen {
  id: string;
  name: string;
  description: string | null;
  whatsapp_number: string;
  image_url: string | null;
  created_at: string;
}

export interface Food {
  id: string;
  canteen_id: string;
  name: string;
  price: number;
  description: string | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
} 