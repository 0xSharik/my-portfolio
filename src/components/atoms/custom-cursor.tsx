"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === "BUTTON" || target.tagName === "A" || 
                           !!target.closest("button") || !!target.closest("a") ||
                           !!target.closest('[role="button"]');
      setIsPointer(isInteractive);
      setIsHovering(isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setIsPointer(false);
    };

    if (window.matchMedia("(pointer: fine)").matches) {
      document.addEventListener("mousemove", updateCursorPosition);
      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mouseout", handleMouseOut);
      document.body.style.cursor = "none";
    }

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.style.cursor = "auto";
    };
  }, []);

  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor - diamond shape */}
      <motion.div
        ref={cursorRef}
        className="fixed z-50 pointer-events-none"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div 
          className="w-6 h-6 relative"
          style={{
            transform: 'rotate(45deg)',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(45deg, #00f2ff, #7000ff)',
              boxShadow: '0 0 20px rgba(0, 242, 255, 0.5)',
            }}
          />
          <div 
            className="absolute inset-1"
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
            }}
          />
        </div>
      </motion.div>
      
      {/* Trailing dot */}
      <motion.div
        className="fixed z-50 pointer-events-none"
        animate={{
          x: position.x - 2,
          y: position.y - 2,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          mass: 1,
        }}
      >
        <div 
          className="w-1 h-1 rounded-full"
          style={{
            background: 'linear-gradient(45deg, #00f2ff, #7000ff)',
            boxShadow: '0 0 10px rgba(0, 242, 255, 0.8)',
          }}
        />
      </motion.div>

      {/* Outer glow ring */}
      <motion.div
        className="fixed z-50 pointer-events-none"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 0.8 : 1,
          opacity: isHovering ? 0.8 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 1.2,
        }}
      >
        <div 
          className="w-10 h-10 rounded-full border-2"
          style={{
            borderColor: 'rgba(0, 242, 255, 0.3)',
            boxShadow: '0 0 20px rgba(0, 242, 255, 0.2)',
          }}
        />
      </motion.div>
    </>
  );
}
