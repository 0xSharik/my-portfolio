"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "Initializing Systems...",
  "Loading Portfolio...",
  "Welcome, Recruiter."
];

export function SmartPreloader({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("preloader_seen");

    if (alreadySeen) {
      // Don't call onFinish immediately - let content fade in naturally
      return;
    }

    setVisible(true);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setLineIndex(i);

      if (i === lines.length) {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem("preloader_seen", "true");
          setVisible(false);
          onFinish(); // Only call onFinish after preloader completes
        }, 600);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-left text-cyan-400 font-mono text-lg space-y-4">
            {lines.slice(0, lineIndex).map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
