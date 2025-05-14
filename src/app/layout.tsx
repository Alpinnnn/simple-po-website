import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import AnimatedFoodIcons from '@/components/layout/AnimatedFoodIcons';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'OrderEase - Pre-Order System',
  description: 'Pesan makanan favorit Anda dengan mudah melalui sistem pre-order kami. Kirim pesanan langsung ke WhatsApp!',
  keywords: ['pre-order', 'food delivery', 'restaurant ordering', 'WhatsApp order', 'online food'],
  authors: [{ name: 'OrderEase Team' }],
  creator: 'OrderEase',
  publisher: 'OrderEase',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://orderease.vercel.app',
    siteName: 'OrderEase',
    title: 'OrderEase - Sistem Pre-Order Makanan',
    description: 'Pesan makanan favorit Anda dengan mudah melalui sistem pre-order kami. Kirim pesanan langsung ke WhatsApp!',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OrderEase - Sistem Pre-Order Makanan',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrderEase - Sistem Pre-Order Makanan',
    description: 'Pesan makanan favorit Anda dengan mudah melalui sistem pre-order kami. Kirim pesanan langsung ke WhatsApp!',
    images: ['/twitter-image.jpg'],
    creator: '@orderease',
  },
  other: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
};

export const viewport: Viewport = {
  themeColor: 'hsl(30 80% 55%)',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <SmoothScrollProvider>
          <CartProvider>
            <AnimatedFoodIcons />
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <footer className="bg-muted text-muted-foreground py-6 text-center">
              <p>&copy; {new Date().getFullYear()} OrderEase. All rights reserved.</p>
            </footer>
            <Toaster />
          </CartProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
