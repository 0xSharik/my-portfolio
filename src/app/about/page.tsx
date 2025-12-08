"use client";

import { motion } from "framer-motion";
import { PageLayout } from "@/components/layouts/page-layout";
import { portfolioContentMock } from "@/config/portfolio-data";
import { SkillsGrid } from "@/components/organisms/skills-grid";
import { ScrambleText } from "@/components/ui/scramble-text";

export default function About() {
  const { name, location, education, skills } = portfolioContentMock;

  const passions = ["Code", "Design", "Innovation", "problem solving", "event management"]; // Placeholder

  return (
    <PageLayout>
      <div className="flex min-h-screen flex-col items-center justify-start px-4 md:px-8">
        <main className="w-full max-w-6xl py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-20 md:space-y-28"
          >
            <section className="space-y-12 md:space-y-16">
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                <span className="text-brand-blue-light">//</span> <ScrambleText text="About Me" scrambleSpeed={100} revealDuration={2000} />
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left: Terminal Bio */}
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
                    <span className="text-brand-blue-light">developer</span>{" = {"}
                    <div className="pl-4">
                      <p>
                        <span className="text-red-400">name</span>:{" "}
                        <span className="text-green-400">'{name}'</span>,
                      </p>
                      <p>
                        <span className="text-red-400">location</span>:{" "}
                        <span className="text-green-400">'{location}'</span>,
                      </p>
                      <p>
                        <span className="text-red-400">education</span>:{" "}
                        <span className="text-green-400">'{education[0].degree}'</span>,
                      </p>
                      <p>
                        <span className="text-red-400">passions</span>: ["
                        {passions.map((p, i) => (
                          <span key={p} className="text-green-400">
                            '{p}'{i < passions.length - 1 ? ", " : ""}
                          </span>
                        ))}
                        "],
                      </p>
                      <p>
                        <span className="text-red-400">available</span>:{" "}
                        <span className="text-blue-400">true</span>,
                      </p>
                    </div>
                    {"}"};
                  </div>
                </motion.div>

                {/* Right: Bio Text */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-6 text-base md:text-lg text-gray-300/90 leading-relaxed"
                >
                  <p>
                    <ScrambleText text="I am a Computer Science Engineer focused on building scalable full-stack and AI-driven applications using Python, React, and Firebase. I have hands-on experience developing web platforms, backend systems, and intelligent features, taking ideas from early concepts to fully working deployments." scrambleSpeed={120} revealDuration={3000} />
                  </p>
                  <p>
                    <ScrambleText text="My technical foundation includes data structures, algorithms, system design, and applied machine learning, which allows me to write code that is not just functional, but efficient and reliable. I care about clean architecture, performance, and long-term maintainability over quick fixes." scrambleSpeed={140} revealDuration={3500} />
                  </p>
                  <p className="relative">
                    <span className="absolute inset-0 text-cyan-400 blur-sm animate-pulse">
                      <ScrambleText text="I enjoy solving real-world problems through thoughtful engineering and building products that are practical, stable, and production-ready." scrambleSpeed={160} revealDuration={4000} />
                    </span>
                    <ScrambleText text="I enjoy solving real-world problems through thoughtful engineering and building products that are practical, stable, and production-ready." scrambleSpeed={160} revealDuration={4000} />
                  </p>
                </motion.div>
              </div>
            </section>

            <SkillsGrid />
          </motion.div>
        </main>
      </div>
    </PageLayout>
  );
}
