"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PortfolioBackground } from "@/components/scenes/portfolio-background";

export function PersistentCanvas() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="fixed inset-0 z-0 bg-black" />
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 5, 30],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Suspense fallback={null}>
          <PortfolioBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}
