"use client";


import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { useRouteTransition } from "@/hooks/use-route-transition";
import { portfolioContentMock } from "@/config/portfolio-data";
import { ScrambleText } from "@/components/ui/scramble-text";

export default function Home() {
  const router = useRouter();
  const { isTransitioning, startTransition, endTransition } = useRouteTransition();

  const { name, heroStats, projects } = portfolioContentMock;

  // Emergency opacity reset - runs immediately on mount
  useEffect(() => {
    const resetOpacity = () => {
      const element = document.getElementById("ui-layer");
      if (element) {
        gsap.killTweensOf("#ui-layer");
        gsap.set("#ui-layer", { opacity: 1 });
      }
    };

    resetOpacity();
    
    // Also reset after a short delay to ensure it's visible
    const timer = setTimeout(resetOpacity, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // ================================
  // Page Load Fade
  // ================================
  useEffect(() => {
    // Force immediate opacity reset
    gsap.killTweensOf("#ui-layer");
    gsap.set("#ui-layer", { opacity: 1 });
    
    // Then do the fade-in animation
    gsap.fromTo(
      "#ui-layer",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  // ================================
  // Page Exit Transition
  // ================================
  const handleNavigate = (path: string) => {
    if (isTransitioning) return; // Prevent multiple simultaneous navigations
    
    startTransition(path);
    
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

  // Featured projects for homepage preview
  const featuredProjects = projects
    .filter((p) => p.featured)
    .slice(0, 2);
  const secondaryProjects = projects
    .filter((p) => !p.featured)
    .slice(0, 2);

  // Skills groups (grouped, not a chaotic tag cloud)
  const coreEngineering = [
    "C++ development",
    "Python scripting",
    "Full-stack app architecture",
  ];

  const aiAndData = [
    "ML-powered features & integration",
    "Data processing & automation",
    "Model-backed workflows",
  ];

  const infraAndSystems = [
    "Firebase & cloud hosting",
    "Auth, routing & state",
    "Production deployment & monitoring",
  ];

  return (
    <div
      id="ui-layer"
      className="relative z-10 min-h-screen pt-20"
      style={{ opacity: 0 }}
    >
      {/* ================= HERO ================= */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
              <ScrambleText
                text={name}
                scrambleSpeed={100}
                revealDuration={2500}
              />
            </h1>

            <p className="text-xl md:text-2xl text-cyan-400 mb-3">
              <ScrambleText
                text="Full-Stack & Systems Engineer"
                scrambleSpeed={120}
                revealDuration={3000}
              />
            </p>

            <p className="text-lg text-gray-300 mb-3">
              <ScrambleText
                text="Co-Founder — Soft Game Studio"
                scrambleSpeed={140}
                revealDuration={3200}
              />
            </p>

            <p className="text-gray-400 max-w-2xl mx-auto md:mx-0">
              <ScrambleText
                text="I design and build production-ready systems that combine clean architecture, automation, and scalable infrastructure."
                scrambleSpeed={150}
                revealDuration={3500}
              />
            </p>

            <div className="flex gap-4 mt-8 justify-center md:justify-start">
              <button
                onClick={() => handleNavigate("/projects")}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                View Projects
              </button>

              <button
                onClick={() => handleNavigate("/contact")}
                className="px-6 py-3 border border-cyan-500/50 text-cyan-400 font-bold rounded-full hover:bg-cyan-500/10 transition-all"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
              <img
                src="/profile-photo.jpg"
                alt="Sharik Hasan"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23000'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2300f2ff' font-family='monospace' font-size='14'%3EPHOTO%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Credibility Strip — Clean Professional Version (No Icons, No Emojis) */}
<div className="max-w-6xl mx-auto mb-16">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

    {/* AI / Full-Stack */}
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-5 border border-cyan-500/20 text-center">
      <h3 className="text-cyan-400 font-semibold text-sm tracking-wide mb-1">
        AI / Full-Stack Developer
      </h3>
      <div className="w-10 h-[2px] bg-cyan-400 mx-auto mb-2"></div>
      <p className="text-gray-400 text-xs leading-relaxed">
        Systems, backend, and ML-backed features
      </p>
    </div>

    {/* Co-Founder */}
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-5 border border-purple-500/20 text-center">
      <h3 className="text-purple-400 font-semibold text-sm tracking-wide mb-1">
        Co-Founder, Soft Game Studio
      </h3>
      <div className="w-10 h-[2px] bg-purple-400 mx-auto mb-2"></div>
      <p className="text-gray-400 text-xs leading-relaxed">
        Shipping real products, not just assignments
      </p>
    </div>

    {/* Defence Club */}
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-5 border border-green-500/20 text-center">
      <h3 className="text-green-400 font-semibold text-sm tracking-wide mb-1">
        Management — CU Defence Club
      </h3>
      <div className="w-10 h-[2px] bg-green-400 mx-auto mb-2"></div>
      <p className="text-gray-400 text-xs leading-relaxed">
        Operations, coordination & leadership
      </p>
    </div>

    {/* Projects */}
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-5 border border-cyan-500/20 text-center">
      <h3 className="text-cyan-400 font-semibold text-sm tracking-wide mb-1">
        10+ Deployed Projects
      </h3>
      <div className="w-10 h-[2px] bg-cyan-400 mx-auto mb-2"></div>
      <p className="text-gray-400 text-xs leading-relaxed">
        Production-grade systems in real use
      </p>
    </div>

  </div>
</div>

      {/* ================= FEATURED PROJECTS PREVIEW ================= */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cyan-400">
            Featured Work
          </h2>
          <button
            onClick={() => handleNavigate("/projects")}
            className="text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
          >
            View all projects →
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[...featuredProjects, ...secondaryProjects].map((project) => (
            <div
              key={project.id}
              className="bg-black/30 backdrop-blur-sm rounded-lg p-5 border border-cyan-500/15 hover:border-cyan-500/40 transition-colors cursor-pointer"
              onClick={() => handleNavigate("/projects")}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-full text-[11px] bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="text-xs text-cyan-400">
                View case study →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= LEADERSHIP ================= */}
      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-cyan-400 mb-8 text-center">
          Leadership & Responsibilities
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Softgame Studio */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Co-Founder — Soft Game Studio
                </h3>
                <span className="inline-block px-3 py-1 bg-purple-500/15 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/30">
                  Startup
                </span>
              </div>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm mt-3">
              <li>• Leading technical direction & system design</li>
              <li>• Driving full-stack product development</li>
              <li>• Handling deployment, infrastructure & reliability</li>
              <li>• Building client-facing products beyond academics</li>
            </ul>
            <a
              href="https://softgamestudios.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 px-4 py-2 text-xs bg-purple-500/15 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-500/25 transition-all"
            >
              Visit Website
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          {/* CU Defence Club */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-green-500/20">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Management Team — CU Defence Club
                </h3>
                <span className="inline-block px-3 py-1 bg-green-500/15 text-green-300 text-xs font-semibold rounded-full border border-green-500/30">
                  Leadership
                </span>
              </div>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm mt-3">
              <li>• Coordinating club operations & events</li>
              <li>• Managing execution, structure & discipline</li>
              <li>• Working with teams under pressure & timelines</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= SKILLS ================= */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-cyan-400 mb-8 text-center">
          Skills & Focus Areas
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Core Engineering */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
            <h3 className="text-sm font-semibold text-cyan-300 mb-3 uppercase tracking-wide">
              Core Engineering
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {coreEngineering.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* AI & Data */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wide">
              AI & Data Work
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {aiAndData.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* Infra & Systems */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-emerald-500/20">
            <h3 className="text-sm font-semibold text-emerald-300 mb-3 uppercase tracking-wide">
              Infrastructure & Systems
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {infraAndSystems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ================= ACHIEVEMENTS ================= */}
      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-cyan-400 mb-8 text-center">
          Achievements
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-black/30 rounded-lg p-6 border border-cyan-500/20 text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {heroStats.projectsCompleted}
            </div>
            <div className="text-gray-400 text-sm">Projects Completed</div>
          </div>

          <div className="bg-black/30 rounded-lg p-6 border border-cyan-500/20 text-center">
            <div className="text-sm font-semibold text-cyan-300 mb-1">
              IDEATHON / HACKATHON
            </div>
            <div className="text-white text-lg font-bold mb-1">
              National Finalist
            </div>
            <div className="text-gray-400 text-xs">
              Systems, ideas & real-world problem solving.
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-6 border border-cyan-500/20 text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {heroStats.professionalProjects}
            </div>
            <div className="text-gray-400 text-sm">
              Professional full-stack builds
            </div>
          </div>
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-10 border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            Let’s Build Something Real
          </h2>
          <p className="text-gray-300 mb-8">
            Open to collaborations, startups, and serious engineering projects.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleNavigate("/projects")}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              View Projects
            </button>

            <button
              onClick={() => handleNavigate("/contact")}
              className="px-6 py-3 border border-cyan-500/50 text-cyan-400 font-bold rounded-full hover:bg-cyan-500/10 transition-all"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
