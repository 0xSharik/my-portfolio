"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type RouteTransitionState = {
  isTransitioning: boolean;
  fromRoute: string;
  toRoute: string;
  direction: "forward" | "backward";
};

type RouteTransitionContextType = RouteTransitionState & {
  startTransition: (toRoute: string) => void;
  endTransition: () => void;
};

const RouteTransitionContext = createContext<RouteTransitionContextType | null>(
  null
);

export function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<RouteTransitionState>({
    isTransitioning: false,
    fromRoute: pathname,
    toRoute: pathname,
    direction: "forward",
  });

  const startTransition = (toRoute: string) => {
    setState((prev) => ({
      ...prev,
      isTransitioning: true,
      fromRoute: prev.toRoute,
      toRoute,
      direction: "forward", // Could implement logic to determine direction
    }));
  };

  const endTransition = () => {
    setState((prev) => ({
      ...prev,
      isTransitioning: false,
      fromRoute: prev.toRoute,
      toRoute: prev.toRoute,
    }));
  };

  useEffect(() => {
    if (pathname !== state.toRoute && !state.isTransitioning) {
      setState((prev) => ({
        ...prev,
        fromRoute: prev.toRoute,
        toRoute: pathname,
      }));
    }
  }, [pathname, state.toRoute, state.isTransitioning]);

  return (
    <RouteTransitionContext.Provider value={{ ...state, startTransition, endTransition }}>
      {children}
    </RouteTransitionContext.Provider>
  );
}

export function useRouteTransition() {
  const context = useContext(RouteTransitionContext);
  if (!context) {
    throw new Error("useRouteTransition must be used within RouteTransitionProvider");
  }
  return context;
}
