"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layouts/page-layout";
import { portfolioContentMock, Project } from "@/config/portfolio-data";
import { ProjectCard } from "@/components/molecules/project-card";
import { ProjectModal } from "@/components/organisms/project-modal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProject = portfolioContentMock.projects.find((p) => p.featured);
  const otherProjects = portfolioContentMock.projects.filter((p) => !p.featured);

  return (
    <PageLayout>
      <div className="flex min-h-screen flex-col items-center justify-start px-4 md:px-8">
        <main className="w-full max-w-6xl py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16 md:space-y-24"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              <span className="text-brand-magenta-light">//</span> Featured Work
            </h1>

            {/* Featured Project */}
            {featuredProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ProjectCard
                  project={featuredProject}
                  onClick={() => setSelectedProject(featuredProject)}
                />
              </motion.div>
            )}

            {/* Other Projects Grid */}
            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                More Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        </main>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </PageLayout>
  );
}
