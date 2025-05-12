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

const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, "Invalid phone number format."),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
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
      variant: "default",
      duration: 5000,
    });
    
    clearCart();
    reset();
    setIsSubmitting(false);
  };

  if (cartItems.length === 0) {
    return null; // Don't show form if cart is empty
  }

  return (
    <Card className="mt-8 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Contact Details</CardTitle>
        <CardDescription>Please provide your details to complete the pre-order.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register("name")} className="mt-1" aria-invalid={errors.name ? "true" : "false"} />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" {...register("phone")} className="mt-1" aria-invalid={errors.phone ? "true" : "false"} />
            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea id="address" {...register("address")} className="mt-1 min-h-[100px]" aria-invalid={errors.address ? "true" : "false"} />
            {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea id="notes" {...register("notes")} className="mt-1 min-h-[80px]" />
          </div>

          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting Pre-Order...' : 'Submit Pre-Order'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
