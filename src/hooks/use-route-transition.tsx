"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

type RouteTransitionState = {
  isTransitioning: boolean;
  fromRoute: string;
  toRoute: string;
  direction: "forward" | "backward";
  isContentVisible: boolean; // Add canvas visibility state
};

type RouteTransitionContextType = RouteTransitionState & {
  startTransition: (toRoute: string) => void;
  endTransition: () => void;
  toggleContentVisibility: () => void; // Add toggle function
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
    isContentVisible: true, // Initialize content as visible
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
    
    // Reset opacity after transition completes
    setTimeout(() => {
      gsap.killTweensOf("#ui-layer");
      gsap.set("#ui-layer", { opacity: state.isContentVisible ? 1 : 0 });
    }, 50);
  };

  const toggleContentVisibility = () => {
    console.log('Toggle content visibility called');
    setState((prev) => {
      const newVisibility = !prev.isContentVisible;
      console.log('New visibility:', newVisibility);
      
      // Debug: Log all potential elements
      console.log('Debug - All main elements:', document.querySelectorAll('main'));
      console.log('Debug - All z-10 elements:', document.querySelectorAll('[class*="z-10"]'));
      console.log('Debug - All nav elements:', document.querySelectorAll('nav'));
      
      // Try to find the content container - different pages have different structures
      let contentElement: HTMLElement | null = document.getElementById('ui-layer') as HTMLElement | null; // Homepage
      
      if (!contentElement) {
        // For other pages, try to find the main content specifically
        const mainContent = document.querySelector('main.relative.z-10') as HTMLElement | null;
        if (mainContent) {
          contentElement = mainContent;
          console.log('Found main content:', mainContent);
        }
      }
      
      // Last fallback: find any element that looks like main content
      if (!contentElement) {
        const allElements = document.querySelectorAll('main, [class*="main"], section');
        for (const candidate of allElements) {
          const htmlCandidate = candidate as HTMLElement;
          // Only select if it's not navbar-related and has content
          if (!htmlCandidate.closest('nav') && 
              !htmlCandidate.classList.contains('z-50') &&
              htmlCandidate.children.length > 0) {
            contentElement = htmlCandidate;
            console.log('Selected fallback element:', htmlCandidate);
            break;
          }
        }
      }
      
      if (contentElement) {
        console.log('Found content element:', contentElement);
        
        // Special handling for pages where navbar is in the same container as content
        if (contentElement.querySelector('nav')) {
          // This container has navbar and content, so hide only the non-navbar children
          const children = Array.from(contentElement.children);
          children.forEach(child => {
            const htmlChild = child as HTMLElement;
            if (!htmlChild.closest('nav') && !htmlChild.classList.contains('z-50')) {
              if (newVisibility) {
                htmlChild.style.opacity = '1';
                htmlChild.style.pointerEvents = 'auto';
              } else {
                htmlChild.style.opacity = '0';
                htmlChild.style.pointerEvents = 'none';
              }
            }
          });
        } else {
          // Normal case - hide the entire element
          if (newVisibility) {
            contentElement.style.opacity = '1';
            contentElement.style.pointerEvents = 'auto';
          } else {
            contentElement.style.opacity = '0';
            contentElement.style.pointerEvents = 'none';
          }
        }
      } else {
        console.warn('Content element not found');
      }
      
      return {
        ...prev,
        isContentVisible: newVisibility,
      };
    });
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

  // Cleanup effect: Ensure opacity is restored on route change
  useEffect(() => {
    if (!state.isTransitioning && pathname !== state.fromRoute) {
      // Route has changed and transition is complete, ensure opacity is restored
      const timer = setTimeout(() => {
        gsap.killTweensOf("#ui-layer");
        gsap.set("#ui-layer", { opacity: 1 });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, state.isTransitioning, state.fromRoute]);

  // Emergency fallback: Force opacity reset every 2 seconds if transitioning is stuck
  useEffect(() => {
    if (state.isTransitioning) {
      const emergencyTimer = setTimeout(() => {
        console.warn("Navigation transition stuck, forcing opacity reset");
        gsap.killTweensOf("#ui-layer");
        gsap.set("#ui-layer", { opacity: 1 });
        endTransition();
      }, 2000);
      
      return () => clearTimeout(emergencyTimer);
    }
  }, [state.isTransitioning, endTransition]);

  return (
    <RouteTransitionContext.Provider value={{ 
      ...state, 
      startTransition, 
      endTransition, 
      toggleContentVisibility 
    }}>
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
