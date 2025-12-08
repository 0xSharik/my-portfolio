"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (path: string) => {
    gsap.to("#ui-layer", {
      opacity: 0,
      duration: 0.4,
      onComplete: () => router.push(path),
    });
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-black/90 backdrop-blur-xl rounded-full border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 px-8 py-2 max-w-4xl"
          : "bg-transparent border-transparent px-4 py-4 w-full max-w-7xl"
      }`}
    >
      <div className={`${isScrolled ? "px-0" : "px-4 sm:px-6 lg:px-8"}`}>
        <div className={`flex items-center justify-between ${isScrolled ? "h-10" : "h-16"}`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className={`text-cyan-400 font-mono font-black transition-all duration-500 ${
              isScrolled ? "text-lg" : "text-xl"
            }`}>
              SHARIK.HASAN
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className={`flex items-baseline transition-all duration-500 ${
              isScrolled ? "space-x-4 ml-8" : "space-x-8 ml-16"
            }`}>
              <button
                onClick={() => handleNavigate("/")}
                className={`transition-all duration-500 ${
                  isScrolled
                    ? "text-gray-300 hover:text-cyan-400 px-2 py-1 rounded-md text-xs font-medium"
                    : "text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium"
                } transition-colors`}
              >
                HOME
              </button>
              <button
                onClick={() => handleNavigate("/about")}
                className={`transition-all duration-500 ${
                  isScrolled
                    ? "text-gray-300 hover:text-cyan-400 px-2 py-1 rounded-md text-xs font-medium"
                    : "text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium"
                } transition-colors`}
              >
                ABOUT
              </button>
              <button
                onClick={() => handleNavigate("/projects")}
                className={`transition-all duration-500 ${
                  isScrolled
                    ? "text-gray-300 hover:text-cyan-400 px-2 py-1 rounded-md text-xs font-medium"
                    : "text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium"
                } transition-colors`}
              >
                PROJECTS
              </button>
              <button
                onClick={() => handleNavigate("/contact")}
                className={`transition-all duration-500 ${
                  isScrolled
                    ? "text-gray-300 hover:text-cyan-400 px-2 py-1 rounded-md text-xs font-medium"
                    : "text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium"
                } transition-colors`}
              >
                CONTACT
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-cyan-400 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-md">
          <button
            onClick={() => handleNavigate("/")}
            className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            HOME
          </button>
          <button
            onClick={() => handleNavigate("/about")}
            className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            ABOUT
          </button>
          <button
            onClick={() => handleNavigate("/projects")}
            className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            PROJECTS
          </button>
          <button
            onClick={() => handleNavigate("/contact")}
            className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            CONTACT
          </button>
        </div>
      </div>
    </nav>
  );
}
