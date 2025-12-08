"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
  isTransitioning: boolean;
  onComplete?: () => void;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  isTransitioning, 
  onComplete 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!isTransitioning || !containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;
    
    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create new timeline
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
        // Reset for next transition
        gsap.set(content, { opacity: 1, scale: 1 });
        // Ensure canvas speed is reset
        window.dispatchEvent(new CustomEvent('pageTransition:end'));
      }
    });

    // Phase 1: Fade out current content
    tl.to(content, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    });

    // Phase 2: Signal canvas to speed up
    tl.call(() => {
      window.dispatchEvent(new CustomEvent('pageTransition:start'));
      document.body.classList.add('transition-active');
    });

    // Phase 3: Wait for canvas speed-up effect
    tl.to({}, { duration: 0.6 });

    // Phase 4: Scale down to tiny point
    tl.to(content, {
      scale: 0.01,
      transformOrigin: "center center",
      duration: 0.3,
      ease: "power2.in"
    });

    // Phase 5: Signal canvas to slow down
    tl.call(() => {
      window.dispatchEvent(new CustomEvent('pageTransition:end'));
      document.body.classList.remove('transition-active');
    });

    // Phase 6: Emerge from point with scale up
    tl.to(content, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)"
    });

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      // Ensure cleanup
      document.body.classList.remove('transition-active');
      window.dispatchEvent(new CustomEvent('pageTransition:end'));
    };
  }, [isTransitioning, onComplete]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div ref={contentRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
};
