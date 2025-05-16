// src/components/cart/CheckoutForm.tsx
"use client";

import { useState, useEffect } from 'react';
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
import { formatCurrency, formatSimpleCurrency, CurrencySettings } from '@/lib';
import { Lock, Unlock } from 'lucide-react';

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

// Nomor WhatsApp admin untuk dikirimkan pre-order
// Menggunakan environment variable dengan fallback ke nomor default jika tidak tersedia
const ADMIN_WHATSAPP = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP;
const DELIVERY_INPUT = process.env.NEXT_PUBLIC_DELIVERY_INPUT;
const DELIVERY_ADDRESS = process.env.NEXT_PUBLIC_DELIVERY_ADDRESS;

export default function CheckoutForm({ onCheckoutSuccess, isModal = false }: CheckoutFormProps) {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddressLocked, setIsAddressLocked] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState('');

  // Menentukan apakah input alamat terkunci atau tidak
  useEffect(() => {
    if (DELIVERY_INPUT === 'locked' && DELIVERY_ADDRESS) {
      setIsAddressLocked(true);
      setDefaultAddress(DELIVERY_ADDRESS);
    } else {
      setIsAddressLocked(false);
      setDefaultAddress('');
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  // Set nilai default alamat jika terkunci
  useEffect(() => {
    if (isAddressLocked && defaultAddress) {
      setValue('address', defaultAddress);
    }
  }, [isAddressLocked, defaultAddress, setValue]);

  // Fungsi untuk format pesan WhatsApp
  const formatWhatsAppMessage = (formData: CheckoutFormValues) => {
    const items = cartItems.map(item => 
      `- ${item.product.name} (${item.quantity}x) @ ${formatSimpleCurrency(item.product.price)} = ${formatSimpleCurrency(item.quantity * item.product.price)}`
    ).join('\n');

    const total = formatSimpleCurrency(getCartTotal());

    return encodeURIComponent(
      `*PRE-ORDER BARU*\n\n` +
      `*Detail Pelanggan:*\n` +
      `Nama: ${formData.name}\n` +
      `No. Telp: ${formData.phone}\n` +
      `Alamat: ${formData.address}\n` +
      `${formData.notes ? `Catatan: ${formData.notes}\n` : ''}` +
      `\n*Detail Pesanan:*\n${items}\n\n` +
      `*Total: ${total}*\n` +
      `*Mata Uang: ${CurrencySettings.code}*`
    );
  };

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
    
    try {
      // Format pesan WhatsApp
      const whatsappMessage = formatWhatsAppMessage(data);
      
      // Buka jendela WhatsApp dengan pesan yang telah diformat
      window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${whatsappMessage}`, '_blank');
      
      toast({
        title: "Pre-Order Submitted!",
        description: "Thank you! We're redirecting you to WhatsApp to confirm your order.",
        variant: "default",
        duration: 5000,
      });
      
      clearCart();
      reset();
      
      if (onCheckoutSuccess) {
        onCheckoutSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your order. Please try again.",
        variant: "destructive",
      });
      console.error("Pre-order submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // This component should not render if cart is empty, CartModal already handles this, but good for standalone
  if (cartItems.length === 0) { 
    return null;
  }

  // Render input alamat berdasarkan kondisi isAddressLocked
  const renderAddressInput = (id: string) => {
    if (isAddressLocked) {
      return (
        <div className="relative">
          <Input 
            id={id} 
            {...register("address")} 
            className="mt-1 bg-muted h-10" 
            value={defaultAddress}
            readOnly
            onClick={() => {
              toast({
                title: "Alamat Pengiriman Terkunci",
                description: `Saat ini hanya dapat dikirim ke ${DELIVERY_ADDRESS}`,
                variant: "warning",
                duration: 3000,
              });
            }}
          />
          <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
      );
    } else {
      return (
        <div className="relative">
          <Textarea 
            id={id} 
            {...register("address")} 
            className="mt-1 min-h-[100px]" 
            aria-invalid={errors.address ? "true" : "false"} 
          />
          <Unlock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
        </div>
      );
    }
  };

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
            <Label htmlFor="addressCFM" className="flex items-center gap-2">
              Delivery Address
              {isAddressLocked && <span className="text-xs text-muted-foreground">(Fixed by Admin)</span>}
            </Label>
            {renderAddressInput("addressCFM")}
          </div>

          <div>
            <Label htmlFor="notesCFM">Additional Notes (Optional)</Label>
            <Textarea id="notesCFM" {...register("notes")} className="mt-1 min-h-[80px]" />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || cartItems.length === 0}>
            {isSubmitting ? 'Submitting Pre-Order...' : `Submit Pre-Order (${formatCurrency(getCartTotal())})`}
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
            <Label htmlFor="addressPage" className="flex items-center gap-2">
              Delivery Address
              {isAddressLocked && <span className="text-xs text-muted-foreground">(Fixed by Admin)</span>}
            </Label>
            {renderAddressInput("addressPage")}
          </div>

          <div>
            <Label htmlFor="notesPage">Additional Notes (Optional)</Label>
            <Textarea id="notesPage" {...register("notes")} className="mt-1 min-h-[80px]" />
          </div>
          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting || cartItems.length === 0}>
            {isSubmitting ? 'Submitting Pre-Order...' : `Submit Pre-Order (${formatCurrency(getCartTotal())})`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
