"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/layouts/page-layout";
import { portfolioContentMock } from "@/config/portfolio-data";
import { SkillsGrid } from "@/components/organisms/skills-grid";

export default function About() {
  const { name, location, education, skills } = portfolioContentMock;

  const passions = ["Code", "Design", "Innovation", "problem solving", "event management"];

  return (
    <PageLayout>
      <div className="flex min-h-screen flex-col items-center justify-start px-4 md:px-8">
        <main className="w-full max-w-6xl py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-24"
          >

            {/* ============================
                1. ABOVE THE FOLD IDENTITY
            ============================ */}
            <section className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-brand-blue-light">//</span>{" "}
                About Me
              </h1>

              <div className="max-w-3xl mx-auto text-gray-300 text-lg">
                Engineering systems, building real products, and operating at the intersection of technology, leadership, and execution.
              </div>

              {/* Authority Badges */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="glass-dark border border-purple-500/30 rounded-lg p-4 text-center">
                  <p className="text-purple-400 font-semibold">Co-Founder</p>
                  <p className="text-gray-300 text-sm">Soft Game Studio</p>
                </div>
                <div className="glass-dark border border-green-500/30 rounded-lg p-4 text-center">
                  <p className="text-green-400 font-semibold">Management Team</p>
                  <p className="text-gray-300 text-sm">CU Defence Club</p>
                </div>
                <div className="glass-dark border border-cyan-500/30 rounded-lg p-4 text-center">
                  <p className="text-cyan-400 font-semibold">AI / Full-Stack Engineer</p>
                  <p className="text-gray-300 text-sm">Systems • Backend • ML</p>
                </div>
              </div>
            </section>

            {/* ============================
                2. TERMINAL BIO (MOVED DOWN)
            ============================ */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-dark rounded-xl border border-brand-blue-light/30 p-5 md:p-6 font-mono text-sm md:text-base shadow-lg shadow-brand-blue/10"
              >
                <div className="mb-3 flex items-center gap-2 text-xs text-cyan-300/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span className="ml-3 text-cyan-300/70">/dev/bio.ts</span>
                </div>

                <div className="text-gray-300">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-brand-blue-light">developer</span> = {"{"}
                  <div className="pl-4">
                    <p><span className="text-red-400">name</span>: <span className="text-green-400">'{name}'</span>,</p>
                    <p><span className="text-red-400">location</span>: <span className="text-green-400">'{location}'</span>,</p>
                    <p><span className="text-red-400">education</span>: <span className="text-green-400">'{education[0].degree}'</span>,</p>
                    <p>
                      <span className="text-red-400">passions</span>: [" 
                      {passions.map((p, i) => (
                        <span key={p} className="text-green-400">
                          '{p}'{i < passions.length - 1 ? ", " : ""}
                        </span>
                      ))}
                      "],
                    </p>
                    <p><span className="text-red-400">available</span>: <span className="text-blue-400">true</span>,</p>
                  </div>
                  {"}"};  
                </div>
              </motion.div>

              {/* Bio Text */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 text-gray-300/90 leading-relaxed"
              >
                <p>
                  I am a Computer Science Engineer focused on building scalable full-stack and AI-driven applications using Python, React, and Firebase.
                </p>
                <p>
                  My technical foundation includes data structures, algorithms, system design, and applied machine learning.
                </p>
                <p>
                  I enjoy solving real-world problems through thoughtful engineering and building products that are practical, stable, and production-ready.
                </p>
              </motion.div>
            </section>

            {/* ============================
                3. LEADERSHIP & EXECUTION
            ============================ */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="glass-dark p-6 rounded-lg border border-purple-500/30">
                <h3 className="text-xl font-bold mb-3 text-white">Co-Founder — Soft Game Studio</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Overseeing operations & execution</li>
                  <li>• Full-stack development & deployment</li>
                  <li>• Product roadmap & real users</li>
                </ul>
              </div>

              <div className="glass-dark p-6 rounded-lg border border-green-500/30">
                <h3 className="text-xl font-bold mb-3 text-white">Management — CU Defence Club</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Operations & coordination</li>
                  <li>• Discipline-based training leadership</li>
                  <li>• Team execution</li>
                </ul>
              </div>
            </section>

            {/* ============================
                4. SKILLS GRID (UNCHANGED)
            ============================ */}
            <SkillsGrid />

            {/* ============================
                5. PROOF STRIP
            ============================ */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="glass-dark p-6 border border-cyan-500/30 rounded-lg">
                <p className="text-2xl font-bold text-white">10+</p>
                <p className="text-gray-400 text-sm">Deployed Projects</p>
              </div>
              <div className="glass-dark p-6 border border-purple-500/30 rounded-lg">
                <p className="text-2xl font-bold text-white">Full Stack</p>
                <p className="text-gray-400 text-sm">Real Product Systems</p>
              </div>
              <div className="glass-dark p-6 border border-green-500/30 rounded-lg">
                <p className="text-2xl font-bold text-white">Leadership</p>
                <p className="text-gray-400 text-sm">Startup & University</p>
              </div>
            </section>

          </motion.div>
        </main>
      </div>
    </PageLayout>
  );
}
