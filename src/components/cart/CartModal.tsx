// src/components/cart/CartModal.tsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import CartView from '@/components/cart/CartView';
import CheckoutForm from '@/components/cart/CheckoutForm';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function CartModal({ isOpen, onOpenChange }: CartModalProps) {
  const { cartItems, getCartTotal } = useCart();

  const handleCheckoutSuccess = () => {
    onOpenChange(false); // Close the modal
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0" side="right">
        <SheetHeader className="p-6 border-b sticky top-0 bg-background z-10">
          <SheetTitle className="text-2xl font-bold text-foreground">Your Shopping Cart</SheetTitle>
          {cartItems.length > 0 && (
            <SheetDescription>
              Review your items and checkout below.
            </SheetDescription>
          )}
           {cartItems.length === 0 && (
            <SheetDescription>
              Your cart is currently empty. Add some products!
            </SheetDescription>
          )}
        </SheetHeader>

        <ScrollArea className="flex-grow">
          <div className="p-6 space-y-6">
            <CartView isModal={true} />
            
            {cartItems.length > 0 && (
              <CheckoutForm onCheckoutSuccess={handleCheckoutSuccess} isModal={true} />
            )}
          </div>
        </ScrollArea>

        {cartItems.length > 0 && (
          <SheetFooter className="p-6 border-t bg-muted/50 sticky bottom-0 z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
              <div>
                <p className="text-lg font-semibold text-muted-foreground">Total:</p>
                <p className="text-2xl font-bold text-primary">
                  ${getCartTotal().toFixed(2)}
                </p>
              </div>
               {/* The CheckoutForm contains the primary submission button. This can be a "Close" button. */}
              <SheetClose asChild>
                <Button variant="outline" className="w-full sm:w-auto">Close</Button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}

         {cartItems.length === 0 && (
           <SheetFooter className="p-6 border-t sticky bottom-0 bg-background z-10">
             <SheetClose asChild>
               <Button variant="outline" className="w-full">Continue Shopping</Button>
             </SheetClose>
           </SheetFooter>
         )}
      </SheetContent>
    </Sheet>
  );
}
