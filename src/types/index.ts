
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
  storeName?: string; // Denormalized for easier display
}

export interface CartItem {
  product: Product;
  quantity: number;
}
