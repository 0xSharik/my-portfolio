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
      <motion.div
        ref={cursorRef}
        className="fixed z-50 pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className={`w-4 h-4 bg-white rounded-full ${isPointer ? "opacity-50" : "opacity-70"}`} />
      </motion.div>
      
      <motion.div
        className="fixed z-50 pointer-events-none"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
      >
        <div className="w-10 h-10 border border-white/30 rounded-full" />
      </motion.div>
    </>
  );
}
