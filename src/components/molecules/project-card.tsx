"use client";

import { motion } from "framer-motion";
import { Project } from "@/config/portfolio-data";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const isSoftgame = project.id === "softgame-studio"  || project.id === "portfolio" ;

  // Categorize tech stack
  const aiTechs = project.techStack.filter(tech => 
    ['TensorFlow', 'TensorFlow Lite', 'OpenAI API', 'NumPy', 'Pandas', 'Python'].includes(tech)
  );
  const infraTechs = project.techStack.filter(tech => 
    !aiTechs.includes(tech)
  );

  // Determine if project has real-time features
  const hasRealTime = project.techStack.some(tech => 
    ['Socket.io', 'WebRTC', 'WebSocket', 'Apache Kafka'].includes(tech)
  );

  // Extract meaningful metrics
  const getPrimaryMetric = () => {
    if (project.metrics && project.metrics.length > 0) {
      const metric = project.metrics[0];
      // Prefer obviously large/monetary/user metrics
      if (metric.includes('K+') || metric.includes('M+') || metric.includes('$')) {
        return metric;
      }
      if (metric.includes('users') || metric.includes('downloads')) {
        return metric;
      }

      // Fallback: return the first metric so cards always show something useful
      return metric;
    }
    return null;
  };

  const primaryMetric = getPrimaryMetric();

  const softgameCardStyle = {
    background: 'linear-gradient(180deg, rgba(0,0,0,0.96), rgba(0,0,0,1))',
    backdropFilter: 'blur(12px)',
    border: '1px solid transparent',
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
    backgroundImage: `
      linear-gradient(180deg, rgba(0,0,0,0.96), rgba(0,0,0,1)),
      linear-gradient(45deg, rgba(255, 215, 0, 0.5), rgba(255, 165, 0, 0.4))
    `,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 -8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 215, 0, 0.2), inset 0 1px 0 rgba(255, 215, 0, 0.2), 0 0 40px rgba(255, 215, 0, 0.25)',
    position: 'relative' as 'relative',
    borderRadius: '1rem',
    overflow: 'hidden',
  };

  const defaultCardStyle = {
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
    position: 'relative' as 'relative',
    borderRadius: '1rem',
    overflow: 'hidden',
  };

  const softgameHoverStyle = {
    y: -4,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 0 2px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.3)',
    transition: { duration: 0.2 }
  };
  
  const defaultHoverStyle = {
    y: -4,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 0 2px rgba(0, 242, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 30px rgba(0, 242, 255, 0.2)',
    transition: { duration: 0.2 }
  };

  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      onClick={onClick}
      className="relative w-full max-w-xl rounded-2xl p-6 cursor-pointer overflow-hidden"
      style={isSoftgame ? softgameCardStyle : defaultCardStyle}
      whileHover={isSoftgame ? softgameHoverStyle : defaultHoverStyle}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.12, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {/* Title + Repo */}
      <div className="flex items-start justify-between">
        <h3 
          className="text-xl font-semibold text-white tracking-wide"
          style={{
            letterSpacing: '0.02em',
            textShadow: isSoftgame ? '0 0 12px rgba(255, 215, 0, 0.35)' : '0 0 12px rgba(0, 242, 255, 0.25)',
          }}
        >
          {project.name}
        </h3>

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            onClick={(e) => e.stopPropagation()}
            className="text-white/60 hover:text-cyan-400 transition-all duration-200"
            aria-label="GitHub Repository"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.textShadow = '0 0 8px rgba(0, 242, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.42 7.86 10.96.57.11.78-.25.78-.56v-1.95c-3.19.69-3.86-1.54-3.86-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.19 1.75 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.3-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.3-.51-1.52.12-3.17 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.18-1.18 3.18-1.18.63 1.65.24 2.87.12 3.17.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.2.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/>
            </svg>
          </a>
        )}
      </div>

      {isSoftgame && (
          <div className="mt-2 flex items-center gap-2">
            <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ color: '#FFD700', backgroundColor: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.3)'}}>
                LIVE
            </span>
            <span className="px-2 py-1 rounded-full text-xs" style={{ color: '#DA70D6', backgroundColor: 'rgba(218, 112, 214, 0.1)', border: '1px solid rgba(218, 112, 214, 0.3)'}}>
                Main Project
            </span>
          </div>
        )}

      {/* Description with visual containment */}
      <div 
        className="mt-3 p-3 rounded-lg"
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <p className="text-sm text-white/70 leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="mt-4 flex flex-wrap gap-2">
        {/* AI Core - Highlighted */}
        {aiTechs.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full text-xs transition-all duration-200"
            style={{
              background: 'rgba(0, 242, 255, 0.1)',
              color: '#00f2ff',
              border: '1px solid rgba(0, 242, 255, 0.2)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 242, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
          >
            {tech}
          </span>
        ))}

        {/* App / Infra - Neutral */}
        {infraTechs.slice(0, 4 - aiTechs.length).map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full text-xs transition-all duration-200"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
          >
            {tech}
          </span>
        ))}

        {/* Overflow indicator */}
        {project.techStack.length > 4 && (
          <span 
            className="px-3 py-1 rounded-full text-xs"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            +{project.techStack.length - 4}
          </span>
        )}
      </div>

      {/* Footer Meta with disciplined alignment */}
      <div className="mt-5 flex items-center justify-between text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
        <div className="flex items-center gap-4" style={{ fontSize: '0.75rem', lineHeight: '1rem' }}>
          {!isSoftgame && primaryMetric && <span>{primaryMetric}</span>}
          <span>{project.year ?? new Date().getFullYear()}</span>
          {hasRealTime && <span style={{ color: '#00f2ff' }}>Real-time</span>}
          {aiTechs.length > 0 && <span style={{ color: '#00f2ff' }}>ML</span>}
        </div>

        {isSoftgame && project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-white hover:text-yellow-300 font-medium transition-all duration-200"
            style={{
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.textShadow = '0 0 8px rgba(255, 215, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            Visit Startup Website →
          </a>
        ) : (
          <button
            className="text-white hover:text-cyan-400 font-medium transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            style={{
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.textShadow = '0 0 8px rgba(0, 242, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            View Case Study →
          </button>
        )}
      </div>
    </motion.div>
  );
}
