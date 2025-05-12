import CartView from '@/components/cart/CartView';
import CheckoutForm from '@/components/cart/CheckoutForm';

export default function CartPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-center sm:text-left text-foreground">
          Your Shopping Cart
        </h1>
        <p className="text-muted-foreground text-center sm:text-left">Review your items and proceed to checkout.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <CartView />
        </div>
        <div className="lg:col-span-1">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
