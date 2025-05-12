import type { Store, Product } from '@/types';

export const mockStores: Store[] = [
  {
    id: 'store-1',
    name: 'BakeGood Bakery',
    contactInfo: {
      phone: '123-456-7890',
      address: '123 Pastry Lane, Flavor Town',
    },
    logoUrl: 'https://picsum.photos/100/100?random=1',
    description: 'Freshly baked goods every day. From bread to cakes, we have it all!',
  },
  {
    id: 'store-2',
    name: 'GreenGrocer Delights',
    contactInfo: {
      phone: '987-654-3210',
      address: '456 Healthy Ave, Organic City',
    },
    logoUrl: 'https://picsum.photos/100/100?random=2',
    description: 'Your one-stop shop for fresh, organic produce and healthy snacks.',
  },
  {
    id: 'store-3',
    name: 'TechHub Gadgets',
    contactInfo: {
      phone: '555-123-4567',
      address: '789 Innovation Rd, Silicon Valley',
    },
    logoUrl: 'https://picsum.photos/100/100?random=3',
    description: 'The latest and greatest in tech gadgets and accessories.',
  },
];

export const mockProducts: Product[] = [
  // BakeGood Bakery Products
  {
    id: 'product-1',
    name: 'Sourdough Bread',
    description: 'Artisan sourdough bread with a crispy crust and soft interior.',
    price: 7.99,
    imageUrl: 'https://picsum.photos/300/200?random=101',
    storeId: 'store-1',
    storeName: 'BakeGood Bakery',
  },
  {
    id: 'product-2',
    name: 'Chocolate Croissants (Box of 4)',
    description: 'Flaky croissants filled with rich dark chocolate.',
    price: 12.50,
    imageUrl: 'https://picsum.photos/300/200?random=102',
    storeId: 'store-1',
    storeName: 'BakeGood Bakery',
  },
  {
    id: 'product-3',
    name: 'Red Velvet Cupcakes (Dozen)',
    description: 'Moist red velvet cupcakes with cream cheese frosting.',
    price: 25.00,
    imageUrl: 'https://picsum.photos/300/200?random=103',
    storeId: 'store-1',
    storeName: 'BakeGood Bakery',
  },
  // GreenGrocer Delights Products
  {
    id: 'product-4',
    name: 'Organic Apple Basket (1kg)',
    description: 'A mix of fresh, crisp organic apples.',
    price: 9.99,
    imageUrl: 'https://picsum.photos/300/200?random=201',
    storeId: 'store-2',
    storeName: 'GreenGrocer Delights',
  },
  {
    id: 'product-5',
    name: 'Avocado Pack (3 units)',
    description: 'Creamy and ripe avocados, perfect for toasts or salads.',
    price: 6.75,
    imageUrl: 'https://picsum.photos/300/200?random=202',
    storeId: 'store-2',
    storeName: 'GreenGrocer Delights',
  },
  {
    id: 'product-6',
    name: 'Fresh Berry Mix (250g)',
    description: 'A delightful mix of seasonal berries - strawberries, blueberries, raspberries.',
    price: 8.20,
    imageUrl: 'https://picsum.photos/300/200?random=203',
    storeId: 'store-2',
    storeName: 'GreenGrocer Delights',
  },
  // TechHub Gadgets Products
  {
    id: 'product-7',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immersive sound experience with advanced noise cancellation.',
    price: 149.99,
    imageUrl: 'https://picsum.photos/300/200?random=301',
    storeId: 'store-3',
    storeName: 'TechHub Gadgets',
  },
  {
    id: 'product-8',
    name: 'Smart Fitness Tracker',
    description: 'Monitor your activity, sleep, and heart rate with this sleek tracker.',
    price: 79.50,
    imageUrl: 'https://picsum.photos/300/200?random=302',
    storeId: 'store-3',
    storeName: 'TechHub Gadgets',
  },
  {
    id: 'product-9',
    name: 'Portable Power Bank 20000mAh',
    description: 'High-capacity power bank to keep your devices charged on the go.',
    price: 45.00,
    imageUrl: 'https://picsum.photos/300/200?random=303',
    storeId: 'store-3',
    storeName: 'TechHub Gadgets',
  },
];
