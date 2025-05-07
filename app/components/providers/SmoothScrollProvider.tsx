'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Lenis with minimal options to avoid TypeScript errors
    window.scrollTo(0, 0);
    
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Force recalculation of dimensions on window resize
    function onResize() {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    }

    window.addEventListener('resize', onResize);
    
    // Make sure Lenis scrolls to the bottom correctly
    document.documentElement.style.height = 'auto';
    document.body.style.minHeight = '100vh';
    
    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Manual fix for scrolling to the bottom
    setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    }, 500);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', onResize);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return <>{children}</>;
} 