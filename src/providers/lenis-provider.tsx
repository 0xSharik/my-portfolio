"use client";

import { useEffect, useRef } from "react";

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const initLenis = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const Lenis = (await import("lenis")).default;
        
        lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
          lenisRef.current?.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Connect to GSAP ScrollTrigger if available
        if (typeof window !== "undefined" && (window as any).gsap) {
          (window as any).gsap.ticker.add((time: number) => {
            lenisRef.current?.raf(time * 1000);
          });
          (window as any).gsap.ticker.lagSmoothing(0);
        }
      } catch (error) {
        console.warn("Lenis initialization failed:", error);
      }
    };

    initLenis();

    return () => {
      lenisRef.current?.destroy();
      if (typeof window !== "undefined" && (window as any).gsap) {
        (window as any).gsap.ticker.remove(() => {});
      }
    };
  }, []);

  return <>{children}</>;
}
