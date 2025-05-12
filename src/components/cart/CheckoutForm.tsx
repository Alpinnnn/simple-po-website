// src/components/cart/CheckoutForm.tsx
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";

const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, "Invalid phone number format."),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onCheckoutSuccess?: () => void;
  isModal?: boolean;
}

export default function CheckoutForm({ onCheckoutSuccess, isModal = false }: CheckoutFormProps) {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log("Pre-Order Submitted:");
    console.log("Contact Details:", data);
    console.log("Order Items:", cartItems.map(item => ({ name: item.product.name, quantity: item.quantity, price: item.product.price })));
    console.log("Total Amount:", getCartTotal().toFixed(2));

    toast({
      title: "Pre-Order Submitted!",
      description: "Thank you! We've received your pre-order and will contact you shortly.",
      variant: "default", // 'default' variant often is green or blue for success
      duration: 5000,
    });
    
    clearCart();
    reset();
    setIsSubmitting(false);
    if (onCheckoutSuccess) {
      onCheckoutSuccess();
    }
  };

  // This component should not render if cart is empty, CartModal already handles this, but good for standalone
  if (cartItems.length === 0) { 
    return null;
  }

  // Modal rendering: no Card wrapper, different title if needed
  if (isModal) {
    return (
      <div className="pt-6 border-t">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Provide Your Details</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="nameCFM">Full Name</Label>
            <Input id="nameCFM" {...register("name")} className="mt-1" aria-invalid={errors.name ? "true" : "false"} />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="phoneCFM">Phone Number</Label>
            <Input id="phoneCFM" type="tel" {...register("phone")} className="mt-1" aria-invalid={errors.phone ? "true" : "false"} />
            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <Label htmlFor="addressCFM">Delivery Address</Label>
            <Textarea id="addressCFM" {...register("address")} className="mt-1 min-h-[100px]" aria-invalid={errors.address ? "true" : "false"} />
            {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <Label htmlFor="notesCFM">Additional Notes (Optional)</Label>
            <Textarea id="notesCFM" {...register("notes")} className="mt-1 min-h-[80px]" />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || cartItems.length === 0}>
            {isSubmitting ? 'Submitting Pre-Order...' : `Submit Pre-Order ($${getCartTotal().toFixed(2)})`}
          </Button>
        </form>
      </div>
    );
  }

  // Original rendering for page context (fallback, though not used anymore)
  return (
    <Card className="mt-8 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Contact Details</CardTitle>
        <CardDescription>Please provide your details to complete the pre-order.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="namePage">Full Name</Label>
            <Input id="namePage" {...register("name")} className="mt-1" aria-invalid={errors.name ? "true" : "false"} />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="phonePage">Phone Number</Label>
            <Input id="phonePage" type="tel" {...register("phone")} className="mt-1" aria-invalid={errors.phone ? "true" : "false"} />
            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <Label htmlFor="addressPage">Delivery Address</Label>
            <Textarea id="addressPage" {...register("address")} className="mt-1 min-h-[100px]" aria-invalid={errors.address ? "true" : "false"} />
            {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <Label htmlFor="notesPage">Additional Notes (Optional)</Label>
            <Textarea id="notesPage" {...register("notes")} className="mt-1 min-h-[80px]" />
          </div>
          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting || cartItems.length === 0}>
            {isSubmitting ? 'Submitting Pre-Order...' : `Submit Pre-Order ($${getCartTotal().toFixed(2)})`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
