"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouteTransition } from "@/hooks/use-route-transition";

type SceneType = "hero" | "about" | "projects" | "contact";

type CanvasContextType = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  currentScene: SceneType;
  isLoaded: boolean;
  setLoaded: (loaded: boolean) => void;
  switchScene: (scene: SceneType) => void;
};

const CanvasContext = createContext<CanvasContextType | null>(null);

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentScene, setCurrentScene] = useState<SceneType>("hero");
  const [isLoaded, setIsLoaded] = useState(false);
  const { toRoute, isTransitioning } = useRouteTransition();

  const setLoaded = (loaded: boolean) => {
    setIsLoaded(loaded);
  };

  const switchScene = (scene: SceneType) => {
    setCurrentScene(scene);
  };

  useEffect(() => {
    // Map routes to scenes
    const routeToScene: Record<string, SceneType> = {
      "/": "hero",
      "/about": "about",
      "/projects": "projects",
      "/contact": "contact",
    };

    const newScene = routeToScene[toRoute] || "hero";
    
    if (newScene !== currentScene && !isTransitioning) {
      setCurrentScene(newScene);
    }
  }, [toRoute, currentScene, isTransitioning]);

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        currentScene,
        isLoaded,
        setLoaded,
        switchScene,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within CanvasProvider");
  }
  return context;
}
