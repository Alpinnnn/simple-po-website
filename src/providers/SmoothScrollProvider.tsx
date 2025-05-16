"use client";

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScrollProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isMobile, setIsMobile] = useState(true); // Default true untuk mencegah animasi sebelum deteksi

  // Deteksi mobile dengan batasan baru 426px
  useEffect(() => {
    const checkMobile = () => {
      const mobileScreen = window.innerWidth < 426;
      setIsMobile(mobileScreen);
      console.log('[SmoothScroll] Screen width:', window.innerWidth, 'Is Mobile:', mobileScreen);
    };

    // Check awal
    checkMobile();

    // Tambahkan event listener untuk resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Inisialisasi Lenis dan GSAP
  useEffect(() => {
    console.log('[SmoothScroll] Initializing with isMobile:', isMobile);
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Buat instance Lenis (Tetap aktif di mobile untuk smooth scrolling)
    const lenisInstance = new Lenis({
      duration: isMobile ? 0.8 : 1.2, // Durasi lebih pendek untuk mobile
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: isMobile ? 0.8 : 1, // Multiplier lebih kecil untuk mobile
    });

    // Integrasi Lenis dengan GSAP
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    // Update ScrollTrigger ketika lenis scroll
    lenisInstance.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Set Lenis instance ke state
    setLenis(lenisInstance);

    // Inisialisasi animasi card hanya jika bukan mobile
    if (!isMobile) {
      console.log('[SmoothScroll] Initializing card animations for desktop');
      setTimeout(() => {
        initializeCardAnimations();
      }, 500); // Delay untuk memastikan DOM telah dirender
    } else {
      console.log('[SmoothScroll] Skipping card animations for mobile');
    }

    // Cleanup pada unmount
    return () => {
      console.log('[SmoothScroll] Cleaning up');
      lenisInstance.destroy();
      gsap.ticker.remove((time) => {
        lenisInstance.raf(time * 1000);
      });
    };
  }, [isMobile]); // Tambahkan isMobile sebagai dependency

  // Inisialisasi animasi card
  const initializeCardAnimations = () => {
    // Animasi untuk card produk
    const productCards = gsap.utils.toArray<HTMLElement>('.product-card');
    console.log('[SmoothScroll] Found', productCards.length, 'product cards to animate');
    
    productCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  };

  return <>{children}</>;
} 