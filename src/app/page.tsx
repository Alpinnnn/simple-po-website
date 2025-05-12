import HeroSection from '@/components/layout/HeroSection';
import ProductList from '@/components/product/ProductList';
import StoreList from '@/components/store/StoreList';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />

      <Separator className="my-12" />

      <section aria-labelledby="stores-heading" id="stores-heading" className="scroll-mt-20">
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-center sm:text-left text-foreground">
          Our Stores
        </h2>
        <StoreList />
      </section>

      <Separator className="my-12" />

      <section aria-labelledby="products-heading" id="products-heading" className="scroll-mt-20">
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-center sm:text-left text-foreground">
          All Products
        </h2>
        <ProductList />
      </section>
    </div>
  );
}
