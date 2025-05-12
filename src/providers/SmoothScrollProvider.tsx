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

  // Inisialisasi Lenis dan GSAP
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Buat instance Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
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

    // Inisialisasi animasi card
    initializeCardAnimations();

    // Cleanup pada unmount
    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove((time) => {
        lenisInstance.raf(time * 1000);
      });
    };
  }, []);

  // Inisialisasi animasi card
  const initializeCardAnimations = () => {
    // Animasi untuk card produk
    gsap.utils.toArray<HTMLElement>('.product-card').forEach((card, i) => {
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