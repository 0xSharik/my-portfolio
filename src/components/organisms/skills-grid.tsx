"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioContentMock, Skill } from "@/config/portfolio-data";

const skillCategories = [
  { id: "language", name: "Languages" },
  { id: "framework", name: "Frameworks" },
  { id: "backend", name: "Backend" },
  { id: "devops", name: "DevOps" },
  { id: "ai", name: "AI/ML" },
  { id: "learning", name: "Learning" },
];

const levelToPercentage = {
  beginner: 40,
  intermediate: 60,
  advanced: 80,
  expert: 95,
};

export function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState("language");

  const filteredSkills = portfolioContentMock.skills.filter(
    (skill) => skill.category === activeCategory
  );

  return (
    <section className="w-full max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
        <span className="text-cyan-400">//</span> Technical Arsenal
      </h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-sm md:text-base rounded-full font-semibold transition-colors duration-300 ${
              activeCategory === cat.id
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/40"
                : "bg-black/50 border border-cyan-500/30 text-gray-300 hover:bg-cyan-500/20"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        key={activeCategory} // Animate when category changes
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-black/40 backdrop-blur-sm p-5 rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/10"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg text-gray-100">{skill.name}</h3>
              {skill.years && (
                <span className="text-xs text-cyan-400/80">
                  {skill.years} {skill.years > 1 ? "years" : "year"}
                </span>
              )}
            </div>
            <div className="w-full bg-black/50 rounded-full h-2.5">
              <motion.div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${levelToPercentage[skill.level]}%` }}
                transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              />
            </div>
            {skill.projectsCount && (
              <p className="text-xs text-gray-400 mt-2">
                Used in {skill.projectsCount}+ projects
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
