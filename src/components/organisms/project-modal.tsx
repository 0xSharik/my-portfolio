"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/config/portfolio-data";
import { X, Github, Globe } from "lucide-react";
import { useEffect } from "react"; // ✅ ADD THIS

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    // Lock body scroll and prevent background scrolling
    if (typeof window === "undefined") return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = prevOverflow || "auto";
      document.body.style.paddingRight = prevPaddingRight || "0px";
    };
  }, []);

  if (!project) return null;

  // ✅ LOCK BACKGROUND SCROLL WHILE MODAL IS OPEN

  // Categorize tech stack for modal
  const aiTechs = project.techStack.filter(tech =>
    ['TensorFlow', 'TensorFlow Lite', 'OpenAI API', 'NumPy', 'Pandas', 'Python'].includes(tech)
  );

  const infraTechs = project.techStack.filter(tech =>
    !aiTechs.includes(tech)
  );

  return (
    <AnimatePresence>
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
  onClick={onClose}
  onWheel={(e) => e.stopPropagation()}
  style={{ overscrollBehavior: "contain" }}
>
        <motion.div
          layoutId={`project-card-${project.id}`}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.96), rgba(0,0,0,1))',
            backdropFilter: 'blur(12px)',
            border: '1px solid transparent',
            backgroundClip: 'padding-box, border-box',
            backgroundOrigin: 'padding-box, border-box',
            backgroundImage: `
              linear-gradient(180deg, rgba(0,0,0,0.96), rgba(0,0,0,1)),
              linear-gradient(45deg, rgba(0, 242, 255, 0.4), rgba(112, 0, 255, 0.4))
            `,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 -8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 40px rgba(0, 242, 255, 0.15)',
            borderRadius: '20px',
            padding: '32px',
          }}
        >
          {/* Enhanced close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 transition-all duration-200"
            style={{
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ef4444';
              e.currentTarget.style.transform = 'scale(0.9)';
              e.currentTarget.style.filter = 'blur(0.5px) drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'none';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.85)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(0.9)';
            }}
          >
            <X size={24} />
          </button>

          {/* Scrollable content container */}
          <div
  className="overflow-y-auto overflow-x-hidden pr-6"
  style={{
    maxHeight: "calc(75vh - 64px)",
    overscrollBehavior: "contain",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0, 242, 255, 0.3) transparent"
  }}
  onClick={(e) => e.stopPropagation()}
>

            {/* Remove inner border layer since we're using background-image approach */}

          <div className="space-y-8">
            {/* Title with anchor glow */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  right: '40px',
                  height: '48px',
                  background: 'radial-gradient(ellipse at center, rgba(0, 242, 255, 0.1), transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
              <h2 
                className="text-4xl font-bold text-white"
                style={{
                  letterSpacing: '0.02em',
                  textShadow: '0 0 16px rgba(0, 242, 255, 0.3)',
                }}
              >
                {project.name}
              </h2>
            </div>

            {/* Enhanced description container */}
            <div 
              className="p-4 rounded-xl"
              style={{
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
              }}
            >
              <p className="text-gray-300/90 leading-relaxed text-lg">
                {project.longDescription}
              </p>
            </div>

            {/* Role section with module styling */}
            <div>
              <h4 
                className="font-semibold mb-3"
                style={{
                  color: '#00f2ff',
                  letterSpacing: '0.02em',
                  textShadow: '0 0 8px rgba(0, 242, 255, 0.2)',
                }}
              >
                Role:
              </h4>
              <div 
                className="p-3 rounded-lg"
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                }}
              >
                <p className="text-gray-300/80">{project.role}</p>
              </div>
            </div>

            {/* Enhanced tech stack */}
            <div>
              <h4 
                className="font-semibold mb-4"
                style={{
                  color: '#00f2ff',
                  letterSpacing: '0.02em',
                  textShadow: '0 0 8px rgba(0, 242, 255, 0.2)',
                }}
              >
                Tech Stack:
              </h4>
              <div className="flex flex-wrap gap-3">
                {/* AI Tech - Highlighted */}
                {aiTechs.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm font-medium transition-all duration-200"
                    style={{
                      background: 'rgba(0, 242, 255, 0.12)',
                      color: '#00f2ff',
                      border: '1px solid rgba(0, 242, 255, 0.15)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 8px rgba(0, 242, 255, 0.05)',
                      borderRadius: '10px',
                      transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 16px rgba(0, 242, 255, 0.3), 0 0 0 1px rgba(0, 242, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 8px rgba(0, 242, 255, 0.05)';
                    }}
                  >
                    {tech}
                  </span>
                ))}

                {/* Infra Tech - Neutral */}
                {infraTechs.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm font-medium transition-all duration-200"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 6px rgba(255, 255, 255, 0.02)',
                      borderRadius: '10px',
                      transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 12px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 6px rgba(255, 255, 255, 0.02)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Enhanced metrics section */}
            {project.metrics && project.metrics.length > 0 && (
              <div>
                <h4 
                  className="font-semibold mb-4"
                  style={{
                    color: '#00f2ff',
                    letterSpacing: '0.02em',
                    textShadow: '0 0 8px rgba(0, 242, 255, 0.2)',
                  }}
                >
                  Key Metrics:
                </h4>
                <div className="space-y-2">
                  {project.metrics.map((metric, index) => (
                    <div 
                      key={metric}
                      className="flex items-center gap-3"
                      style={{
                        padding: '8px 12px',
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          background: 'linear-gradient(45deg, #00f2ff, #7000ff)',
                          boxShadow: '0 0 8px rgba(0, 242, 255, 0.5)',
                        }}
                      />
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced action buttons */}
            <div className="flex items-center gap-4 pt-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-200"
                  style={{
                    background: 'linear-gradient(45deg, #00f2ff, #7000ff)',
                    color: '#000',
                    boxShadow: '0 4px 16px rgba(0, 242, 255, 0.3)',
                    transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 242, 255, 0.4)';
                    e.currentTarget.style.background = 'linear-gradient(45deg, #00ffff, #8b00ff)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 242, 255, 0.3)';
                    e.currentTarget.style.background = 'linear-gradient(45deg, #00f2ff, #7000ff)';
                  }}
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
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-200"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.color = '#00f2ff';
                    e.currentTarget.style.border = '1px solid rgba(0, 242, 255, 0.3)';
                    e.currentTarget.style.background = 'rgba(0, 242, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(0, 242, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Github size={16} />
                  View Source
                </a>
              )}
            </div>
          </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}