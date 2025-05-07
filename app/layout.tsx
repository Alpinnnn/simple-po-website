import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/providers/AuthProvider";
import SmoothScrollProvider from "./components/providers/SmoothScrollProvider";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Pre-Order System",
  description: "Order food from our canteens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background text-foreground`}
      >
        <AuthProvider>
          <SmoothScrollProvider>
            <Header />
            <main className="flex-grow flex-shrink-0 w-full">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
