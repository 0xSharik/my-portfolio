"use client";

import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { useState } from "react";

export function Footer() {
  const router = useRouter();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    gsap.to("#ui-layer", {
      opacity: 0,
      duration: 0.4,
      onComplete: () => router.push(path),
    });
  };

  return (
    <footer className="relative bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-xl border-t border-cyan-500/30 py-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div className="max-w-7xl mx-auto px-1">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="relative z-10">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
              <h3 className="text-cyan-400 font-mono font-black text-xl mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                SHARIK.HASAN
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Computer Science Engineer passionate about building innovative solutions.
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-400 text-xs font-mono">AVAILABLE FOR WORK</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="relative z-10">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
              <h4 className="text-white font-semibold mb-4 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                Quick Links
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "Projects", path: "/projects" },
                  { name: "Contact", path: "/contact" }
                ].map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavigate(link.path)}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`block w-full text-left transition-all duration-300 ${
                      hoveredLink === link.name
                        ? "text-cyan-400 translate-x-2"
                        : "text-gray-400 hover:text-cyan-300"
                    } text-sm`}
                  >
                    <span className="flex items-center">
                      <span className={`w-1 h-1 bg-current rounded-full mr-3 transition-all duration-300 ${
                        hoveredLink === link.name ? "w-8" : "w-1"
                      }`}></span>
                      {link.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Connect */}
          <div className="relative z-10">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
              <h4 className="text-white font-semibold mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Connect
              </h4>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300 text-sm">
                  <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Chandigarh, India
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  sharikhasan390@gmail.com
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.414l.707-.707zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" />
                  </svg>
                  Available for work
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="relative z-10 border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 Sharik Hasan. Built with passion and lots of coffee.
            </p>
            <div className="flex items-center space-x-6 text-xs text-gray-600">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                System Online
              </span>
              <span>v2.0</span>
              <span>Last Deploy: Today</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
