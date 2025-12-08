"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { portfolioContentMock } from "@/config/portfolio-data";
import { ScrambleText } from "@/components/ui/scramble-text";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { name, primaryTitle, tagline, heroStats, skills } =
    portfolioContentMock;

  // ================================
  // Page Load Animation
  // ================================
  useEffect(() => {
    // Fade in the page when it loads
    gsap.fromTo("#ui-layer", 
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  // ================================
  // 3D Tilt Interaction
  // ================================
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      const mouseX = e.clientX - windowHalfX;
      const mouseY = e.clientY - windowHalfY;

      const refs = [heroRef, aboutRef, skillsRef, statsRef, ctaRef];
      
      refs.forEach(ref => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceX);
          
          if (distance < 300) {
            const tiltX = (distanceY / rect.height) * -5;
            const tiltY = (distanceX / rect.width) * 5;
            
            gsap.to(ref.current, {
              rotateX: tiltX,
              rotateY: tiltY,
              duration: 0.4,
              ease: "power2.out",
            });
          } else {
            gsap.to(ref.current, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ================================
  // Page Exit Transition
  // ================================
  const handleNavigate = (path: string) => {
    gsap.to("#ui-layer", {
      opacity: 0,
      duration: 0.4,
      onComplete: () => router.push(path),
    });
  };

  return (
    <div id="ui-layer" className="relative z-10 min-h-screen pt-20 px-4" style={{ opacity: 0 }}>
      {/* Hero Section */}
      <div ref={heroRef} className="text-center mb-16" style={{ transformStyle: 'preserve-3d' }}>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4">
          <ScrambleText text={name} scrambleSpeed={100} revealDuration={2500} />
        </h1>
        <p className="text-xl md:text-2xl text-cyan-400 mb-4">
          <ScrambleText text={primaryTitle} scrambleSpeed={120} revealDuration={3000} />
        </p>
        <p className="text-gray-300 max-w-2xl mx-auto">
          <ScrambleText text={tagline} scrambleSpeed={140} revealDuration={3500} />
        </p>
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="max-w-4xl mx-auto mb-16" style={{ transformStyle: 'preserve-3d' }}>
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            <ScrambleText text="About Me" scrambleSpeed={160} revealDuration={3000} />
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              <ScrambleText text="I'm a passionate Computer Science Engineering student with a deep interest in cutting-edge technologies including AI/ML, C++ development, and 5G networks." scrambleSpeed={180} revealDuration={3500} />
            </p>
            <p>
              <ScrambleText text="I love building innovative solutions that bridge the gap between complex technical concepts and practical applications. My journey in tech has been driven by curiosity and a desire to create meaningful impact through code." scrambleSpeed={200} revealDuration={4000} />
            </p>
            <p className="relative">
              <span className="absolute inset-0 text-cyan-400 blur-sm animate-pulse">
                <ScrambleText text="When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community." scrambleSpeed={220} revealDuration={4500} />
              </span>
              <ScrambleText text="When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community." scrambleSpeed={220} revealDuration={4500} />
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div ref={skillsRef} className="max-w-4xl mx-auto mb-16" style={{ transformStyle: 'preserve-3d' }}>
        <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
          <ScrambleText text="Skills & Expertise" scrambleSpeed={240} revealDuration={3000} />
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill: any, index: number) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20 hover:border-cyan-400/40 transition-all"
            >
              <div className="text-2xl mb-2">{skill.icon}</div>
              <div className="text-white font-semibold">
                <ScrambleText text={skill.name} scrambleSpeed={250 + index * 10} revealDuration={3500} />
              </div>
              <div className="text-gray-400 text-sm">
                <ScrambleText text={skill.level} scrambleSpeed={260 + index * 10} revealDuration={4000} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="max-w-4xl mx-auto mb-16" style={{ transformStyle: 'preserve-3d' }}>
        <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
          <ScrambleText text="Achievements" scrambleSpeed={280} revealDuration={3000} />
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 text-center">
            <div className="text-3xl font-bold text-white mb-2">{heroStats.projectsCompleted}</div>
            <div className="text-gray-400">
              <ScrambleText text="Projects Completed" scrambleSpeed={290} revealDuration={3500} />
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 text-center">
            <div className="text-3xl font-bold text-white mb-2">
              <span className="text-cyan-400">
                <ScrambleText text="IDEAT-A-THON" scrambleSpeed={300} revealDuration={4000} />
              </span>
              <div className="text-lg text-gray-300 mt-1">National Level Finalist</div>
            </div>
            <div className="text-gray-400 text-sm">
              <ScrambleText text="Ideathon Competition" scrambleSpeed={310} revealDuration={4500} />
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 text-center">
            <div className="text-3xl font-bold text-white mb-2">{heroStats.professionalProjects}</div>
            <div className="text-gray-400">
              <ScrambleText text="Professional Full Stack Projects for Firms" scrambleSpeed={320} revealDuration={5000} />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="max-w-4xl mx-auto text-center mb-20" style={{ transformStyle: 'preserve-3d' }}>
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            <ScrambleText text="Let's Connect" scrambleSpeed={330} revealDuration={3000} />
          </h2>
          <p className="text-gray-300 mb-8">
            <ScrambleText text="Interested in collaborating or have a project in mind? I'd love to hear from you!" scrambleSpeed={340} revealDuration={3500} />
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleNavigate("/projects")}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              <ScrambleText text="View Projects" scrambleSpeed={350} revealDuration={4000} />
            </button>
            <button
              onClick={() => handleNavigate("/contact")}
              className="px-6 py-3 border border-cyan-500/50 text-cyan-400 font-bold rounded-full hover:bg-cyan-500/10 transition-all"
            >
              <ScrambleText text="Get In Touch" scrambleSpeed={360} revealDuration={4500} />
            </button>
          </div>
        </div>
      </div>

      
      {/* ================= FUTURE CONTENT SECTIONS ================= */}
      {/* Add new sections below this comment */}
      {/* 
        Examples of sections you can add:
        - Experience Timeline
        - Blog/Articles
        - Testimonials
        - Certifications
        - Open Source Contributions
      */}

      {/* Experience Timeline Section - Uncomment when ready */}
      {/* 
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-cyan-400 mb-8 text-center">Experience</h2>
        <div className="space-y-8">
          <div className="border-l-2 border-cyan-500/50 pl-8 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-500 rounded-full"></div>
            <h3 className="text-xl font-bold text-white">Software Developer</h3>
            <p className="text-cyan-400">Company Name</p>
            <p className="text-gray-400">2023 - Present</p>
            <p className="text-gray-300 mt-2">Description of role and achievements</p>
          </div>
        </div>
      </div>
      */}

      {/* Blog Section - Uncomment when ready */}
      {/* 
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-cyan-400 mb-8 text-center">Latest Articles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
            <h3 className="text-lg font-bold text-white mb-2">Article Title</h3>
            <p className="text-gray-400 text-sm mb-2">Date • Category</p>
            <p className="text-gray-300">Brief description of article content...</p>
          </div>
        </div>
      </div>
      */}

    </div>
  );
}
