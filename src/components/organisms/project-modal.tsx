"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/config/portfolio-data";
import { X, Github, Globe } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            layoutId={`project-card-${project.id}`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the modal content
            className="glass-dark relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-brand-blue-light/30 p-8 shadow-2xl shadow-brand-blue/20"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-100">{project.name}</h2>
              <p className="text-gray-300/90 leading-relaxed">
                {project.longDescription}
              </p>

              <div>
                <h4 className="font-semibold text-brand-green-light mb-2">Role:</h4>
                <p className="text-gray-400">{project.role}</p>
              </div>

              <div>
                <h4 className="font-semibold text-brand-green-light mb-3">Tech Stack:</h4>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-background-dark border border-brand-green-light/20 text-brand-green-light/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h4 className="font-semibold text-brand-green-light mb-2">Key Metrics:</h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    {project.metrics.map((metric) => (
                      <li key={metric}>{metric}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-4 pt-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-brand-blue text-background-dark transition-transform hover:scale-105"
                  >
                    <Globe size={16} />
                    Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-brand-blue-light"
                  >
                    <Github size={16} />
                    View Source
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
