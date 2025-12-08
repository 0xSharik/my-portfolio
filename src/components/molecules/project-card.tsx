"use client";

import { motion } from "framer-motion";
import { Project } from "@/config/portfolio-data";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      onClick={onClick}
      className="glass-dark group relative cursor-pointer overflow-hidden rounded-xl border border-brand-blue-light/20 p-5 shadow-lg shadow-brand-blue/10 transition-all duration-300 hover:border-brand-blue-light/40 hover:shadow-brand-blue/20"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg text-gray-100 group-hover:text-brand-blue-light transition-colors">
              {project.name}
            </h3>
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-brand-blue-light transition-colors" />
          </div>
          <p className="text-sm text-gray-400/90 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-background-dark border border-brand-green-light/20 text-brand-green-light/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
