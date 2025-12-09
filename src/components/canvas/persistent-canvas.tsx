"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PortfolioBackground } from "@/components/scenes/portfolio-background";

export function PersistentCanvas() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Detect mobile device
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                           window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isClient) {
    return (
      <div className="fixed inset-0 z-0 bg-black" />
    );
  }

  // Mobile-optimized canvas settings
  const mobileCanvasProps = {
    camera: {
      position: [0, 0, 30] as [number, number, number],
      fov: 60,
      near: 0.1,
      far: 500,
    },
    gl: {
      antialias: false, // Disable for performance
      alpha: true,
      powerPreference: "high-performance" as const,
    },
    dpr: Math.min(window.devicePixelRatio, 1), // Lower DPR for mobile
  };

  // Desktop canvas settings
  const desktopCanvasProps = {
    camera: {
      position: [0, 0, 25] as [number, number, number],
      fov: 75,
      near: 0.1,
      far: 1000,
    },
    gl: {
      antialias: true,
      alpha: true,
    },
    dpr: Math.min(window.devicePixelRatio, 2),
  };

  const canvasProps = isMobile ? mobileCanvasProps : desktopCanvasProps;

  return (
    <div className="fixed inset-0 z-0">
      <Canvas {...canvasProps}>
        <Suspense fallback={null}>
          <PortfolioBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}
