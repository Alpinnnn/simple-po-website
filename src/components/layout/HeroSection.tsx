import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-card rounded-xl shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
            Pre-Order Your Favorites, Effortlessly.
          </h1>
          <p className="text-lg sm:text-xl text-card-foreground leading-relaxed">
            Website Pre-Order Simple dan Mudah Untuk Tugas PKK Kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <Link href="#products-heading">
                Explore Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-accent/50 transition-shadow">
              <Link href="#stores-heading">
                Discover Stores
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl group">
          <Image
            src="https://picsum.photos/800/600?random=hero"
            alt="Assortment of pre-orderable products"
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            data-ai-hint="store items"
            priority
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300"></div>
        </div>
      </div>
    </section>
  );
}
