"use client";

import React, { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealDuration?: number;
  chars?: string;
  triggerOnce?: boolean;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = "",
  scrambleSpeed = 80,
  revealDuration = 3000,
  chars = "!<>-_\\/[]{}—=+*^?#________",
  triggerOnce = true
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          // Add small delay for smoother scroll experience
          setTimeout(() => {
            setIsVisible(true);
            setHasTriggered(true);
          }, 100);
        } else if (!entry.isIntersecting && !triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2, // Higher threshold for better timing
        rootMargin: '0px 0px -50px 0px' // Reduced offset for more precise triggering
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [triggerOnce, hasTriggered]);

  // Scramble animation
  useEffect(() => {
    if (!isVisible) {
      if (!triggerOnce) {
        setDisplayedText("");
      }
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const scramble = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < revealDuration) {
        const revealProgress = progress / revealDuration;
        const charsToReveal = Math.floor(text.length * revealProgress);
        
        let scrambled = "";
        for (let i = 0; i < text.length; i++) {
          if (i < charsToReveal) {
            scrambled += text[i];
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        setDisplayedText(scrambled);
        animationFrame = requestAnimationFrame(scramble);
      } else {
        setDisplayedText(text);
      }
    };

    animationFrame = requestAnimationFrame(scramble);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, text, revealDuration, chars, triggerOnce]);

  return (
    <span ref={elementRef} className={`inline-block ${className}`}>
      {displayedText || (isVisible ? "" : text)}
    </span>
  );
};
