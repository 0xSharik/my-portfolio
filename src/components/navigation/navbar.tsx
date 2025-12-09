"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRouteTransition } from "@/hooks/use-route-transition";
import { gsap } from "gsap";
import { X, Menu, Eye, EyeOff } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const { isTransitioning, startTransition, endTransition, isContentVisible, toggleContentVisibility } = useRouteTransition();
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
    if (isTransitioning) return; // Prevent multiple simultaneous navigations
    
    startTransition(path);
    setIsMobileMenuOpen(false);
    
    // Kill any existing animations on #ui-layer
    gsap.killTweensOf("#ui-layer");
    
    gsap.to("#ui-layer", {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        router.push(path);
        // End transition after a short delay
        setTimeout(() => endTransition(), 100);
      },
    });
  };

  // Mobile Navbar
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return (
      <>
        {/* Mobile Navigation Bar */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-black/95 backdrop-blur-xl border-b border-cyan-500/20"
              : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div
                className={`text-cyan-400 font-mono font-black transition-all duration-500 ${
                  isScrolled ? "text-lg" : "text-xl"
                }`}
              >
                SHARIK.HASAN
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="relative z-50 p-2 rounded-lg transition-all duration-200"
              style={{
                background: isMobileMenuOpen
                  ? "rgba(0, 242, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(0, 242, 255, 0.2)",
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={20} style={{ color: "#00f2ff" }} />
              ) : (
                <Menu size={20} style={{ color: "rgba(255, 255, 255, 0.8)" }} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl">
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative flex flex-col items-center justify-center h-full space-y-12 px-4">
              {/* Menu Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-white mb-2" style={{ letterSpacing: '0.2em' }}>
                  NAVIGATION
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-8 text-center">
                {["/", "/about", "/projects", "/contact"].map((path, index) => (
                  <button
                    key={path}
                    onClick={() => handleNavigate(path)}
                    className="relative group block text-3xl font-light transition-all duration-500"
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      letterSpacing: "0.15em",
                      transform: `translateY(${isMobileMenuOpen ? "0" : "30px"})`,
                      opacity: isMobileMenuOpen ? 1 : 0,
                      transitionDelay: `${index * 150}ms`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#00f2ff";
                      e.currentTarget.style.transform = "scale(1.1) translateY(-2px)";
                      e.currentTarget.style.textShadow = "0 0 20px rgba(0, 242, 255, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                      e.currentTarget.style.transform = "scale(1) translateY(0)";
                      e.currentTarget.style.textShadow = "none";
                    }}
                  >
                    <span className="relative z-10">
                      {path === "/" ? "HOME" : path.substring(1).toUpperCase()}
                    </span>
                    {/* Hover underline */}
                    <div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
                      style={{
                        width: '0%',
                        transition: 'width 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.width = '100%';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.width = '0%';
                      }}
                    />
                  </button>
                ))}
                
                {/* Canvas Toggle Button for Mobile */}
                <button
                  onClick={toggleContentVisibility}
                  className="relative group block text-3xl font-light transition-all duration-500"
                  style={{
                    color: "rgba(168, 85, 247, 0.9)",
                    letterSpacing: "0.15em",
                    transform: `translateY(${isMobileMenuOpen ? "0" : "30px"})`,
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transitionDelay: `${4 * 150}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#a855f7";
                    e.currentTarget.style.transform = "scale(1.1) translateY(-2px)";
                    e.currentTarget.style.textShadow = "0 0 20px rgba(168, 85, 247, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(168, 85, 247, 0.9)";
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  <span className="relative  z-10 flex items-center justify-center gap-2">
                    {isContentVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    CANVAS
                  </span>
                  {/* Hover underline */}
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300"
                    style={{
                      width: '0%',
                      transition: 'width 0.3s ease',
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.width = '100%';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.width = '0%';
                      }}
                    />
                </button>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6 pt-8">
                {[
                  { name: "GitHub", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                  { name: "LinkedIn", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                ].map((social, index) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'rgba(0, 242, 255, 0.05)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 242, 255, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(0, 242, 255, 0.6)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 242, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(0, 242, 255, 0.3)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <svg className="w-5 h-5" style={{ color: '#00f2ff' }} viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p 
                  className="text-sm mb-2"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    letterSpacing: '0.05em',
                  }}
                >
                  CS Engineer • Creative Developer
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Available
                  </span>
                  <span>•</span>
                  <span>Chandigarh, IN</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Navbar
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
            <div
              className={`text-cyan-400 font-mono font-black transition-all duration-500 ${
                isScrolled ? "text-lg" : "text-xl"
              }`}
            >
              SHARIK.HASAN
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div
              className={`flex items-baseline transition-all duration-500 ${
                isScrolled ? "space-x-4 ml-8" : "space-x-8 ml-16"
              }`}
            >
              {["/", "/about", "/projects", "/contact"].map((path) => (
                <button
                  key={path}
                  onClick={() => handleNavigate(path)}
                  className={`transition-all duration-500 ${
                    isScrolled
                      ? "text-gray-300 hover:text-cyan-400 px-2 py-1 rounded-md text-xs font-medium"
                      : "text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium"
                  } transition-colors`}
                >
                  {path === "/" ? "HOME" : path.substring(1).toUpperCase()}
                </button>
              ))}
              
              {/* Canvas Toggle Button */}
              <button
                onClick={toggleContentVisibility}
                className={`self-end transition-all duration-500 ${
                  isScrolled
                    ? "text-purple-400 hover:text-purple-300 px-2 py-1 rounded-md text-xs font-medium border border-purple-500/30"
                    : "text-purple-400 hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium border border-purple-500/30"
                } transition-colors flex items-center gap-1`}
                title={isContentVisible ? "Hide Content" : "Show Content"}
              >
                {isContentVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                {isScrolled ? "" : "CANVAS"}
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
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
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
