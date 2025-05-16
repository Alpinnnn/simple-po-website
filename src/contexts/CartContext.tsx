"use client";

import type { FoodProduct, CartItem } from '@/types'; // Updated to FoodProduct
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, AlertCircle, Trash2 } from 'lucide-react';

interface CartContextType {
  cartItems: CartItem[]; // CartItem now uses FoodProduct
  addToCart: (product: FoodProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = useCallback((product: FoodProduct, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
    
    // Notifikasi yang lebih menarik tanpa ikon pada deskripsi
    toast({
      title: "Item Ditambahkan",
      description: (
        <div>
          <span><strong>{product.name}</strong> telah ditambahkan ke keranjang.</span>
        </div>
      ),
      variant: "success", // Menggunakan varian success yang baru
      duration: 3000, // 3 detik
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast({
          title: "Item Dihapus",
          description: (
            <div>
              <span><strong>{itemToRemove.product.name}</strong> telah dihapus dari keranjang.</span>
            </div>
          ),
          variant: "destructive",
          duration: 3000,
        });
      }
      return prevItems.filter((item) => item.product.id !== productId);
    });
  }, [toast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      const prevItem = prevItems.find(item => item.product.id === productId);
      const updatedItems = prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0);
      
      // Jika item dihapus karena quantity menjadi 0
      if (prevItem && prevItem.quantity > 0 && quantity <= 0) {
        toast({
          title: "Item Dihapus",
          description: (
            <div>
              <span><strong>{prevItem.product.name}</strong> telah dihapus dari keranjang.</span>
            </div>
          ),
          variant: "destructive",
          duration: 3000,
        });
      }
      
      return updatedItems;
    });
  }, [toast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    toast({
      title: "Keranjang Dikosongkan",
      description: (
        <div>
          <span>Semua item telah dihapus dari keranjang Anda.</span>
        </div>
      ),
      variant: "warning",
      duration: 3000,
    });
  }, [toast]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
