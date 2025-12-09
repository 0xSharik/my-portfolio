"use client";

import { useContext, createContext, useRef, useEffect } from "react";

interface LenisContextType {
  lenis: any;
  stop: () => void;
  start: () => void;
  isStopped: boolean;
}

const LenisContext = createContext<LenisContextType | null>(null);

export function useLenis() {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within LenisProvider");
  }
  return context;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const isStoppedRef = useRef(false);

  useEffect(() => {
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        
        lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
          if (!isStoppedRef.current) {
            lenisRef.current?.raf(time);
          }
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Connect to GSAP ScrollTrigger if available
        if (typeof window !== "undefined" && (window as any).gsap) {
          (window as any).gsap.ticker.add((time: number) => {
            if (!isStoppedRef.current) {
              lenisRef.current?.raf(time * 1000);
            }
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

  const stop = () => {
    if (lenisRef.current && !isStoppedRef.current) {
      isStoppedRef.current = true;
      lenisRef.current.stop();
    }
  };

  const start = () => {
    if (lenisRef.current && isStoppedRef.current) {
      isStoppedRef.current = false;
      lenisRef.current.start();
    }
  };

  const value: LenisContextType = {
    lenis: lenisRef.current,
    stop,
    start,
    isStopped: isStoppedRef.current,
  };

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  );
}
