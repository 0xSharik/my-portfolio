// Central portfolio content config.
// Replace mock values with real data when you're ready.

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Skill {
  name: string;
  category: "language" | "framework" | "tool" | "backend" | "devops" | "ai" | "learning";
  level: SkillLevel;
  years?: number;
  projectsCount?: number;
}

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  role: string;
  liveUrl?: string;
  repoUrl?: string;
  metrics?: string[];
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
  technologies?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  bullets?: string[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  devto?: string;
  medium?: string;
  email?: string;
}

export interface HeroStats {
  projectsCompleted: number;
  ideathonFinalist: boolean;
  professionalProjects: number;
}

export interface PortfolioContent {
  // High-level identity; swap these mocks for real values.
  name: string;
  primaryTitle: string;
  tagline: string;
  location: string;
  availability: string;

  heroStats: HeroStats;

  skills: Skill[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  social: SocialLinks;
}

export const portfolioContentMock: PortfolioContent = {
  name: "Sharik Hasan",
  primaryTitle: "Full Stack Developer",
  tagline: "Building performant systems and immersive web experiences.",
  location: "Chandigarh, India",

  availability: "Open to opportunities",

  heroStats: {
    projectsCompleted: 10,
    ideathonFinalist: true,
    professionalProjects: 5,
  },

  skills: [
    {
      name: "C",
      category: "language",
      level: "intermediate",
      years: 2,
      projectsCount: 3,
    },
    {
      name: "C++",
      category: "language",
      level: "advanced",
      years: 3,
      projectsCount: 5,
    },
    {
      name: "Python",
      category: "language",
      level: "advanced",
      years: 2,
      projectsCount: 4,
    },
    {
      name: "TypeScript",
      category: "language",
      level: "advanced",
      years: 2,
      projectsCount: 2,
    },
    {
      name: "React",
      category: "framework",
      level: "advanced",
      years: 2,
      projectsCount: 10,
    },
    {
      name: "Next.js",
      category: "framework",
      level: "advanced",
      years: 2,
      projectsCount: 2,
    },
    {
      name: "Node.js",
      category: "backend",
      level: "advanced",
      years: 1,
      projectsCount: 2,
    },
    {
      name: "PostgreSQL",
      category: "backend",
      level: "intermediate",
      years: 1,
      projectsCount: 0,
    },
    {
      name: "Firebase",
      category: "backend",
      level: "intermediate",
      years: 1.5,
      projectsCount: 10,
    },
    {
      name: "Coming Soon",
      category: "devops",
      level: "beginner",
    },
    {
      name: "Three.js",
      category: "framework",
      level: "intermediate",
      years: 1,
      projectsCount: 2,
    },
    {
      name: "TensorFlow",
      category: "ai",
      level: "intermediate",
      years: 1,
      projectsCount: 2,
    },
    {
      name: "NumPy",
      category: "ai",
      level: "advanced",
      years: 1,
      projectsCount: 3,
    },
    {
      name: "Pandas",
      category: "ai",
      level: "advanced",
      years: 1,
      projectsCount: 3,
    },
    {
      name: "Java",
      category: "learning",
      level: "intermediate",
      years: 0,
      projectsCount: 0,
    },
    {
      name: "MongoDB",
      category: "learning",
      level: "intermediate",
      years: 0,
      projectsCount: 1,
    },
    {
      name: "Docker",
      category: "learning",
      level: "intermediate",
      years: 0,
      projectsCount: 0,
    },
  ],

  projects: [
    {
      id: "realtime-portfolio",
      name: "Realtime 3D Portfolio",
      shortDescription: "A Next.js + React Three Fiber portfolio with a persistent 3D background and interactive tech scene.",
      longDescription:
        "A developer portfolio that visualizes skills and projects as a live computational environment using React Three Fiber, custom shaders, and advanced UI animations.",
      techStack: ["Next.js", "React", "TypeScript", "React Three Fiber", "Framer Motion"],
      role: "Designed and implemented the full stack, from 3D scene architecture to UI components.",
      repoUrl: "https://github.com/your-username/realtime-portfolio",
      liveUrl: "https://your-portfolio-url.dev",
      metrics: [
        "90+ Lighthouse performance score",
        "Sub-2s Time to Interactive on desktop",
      ],
      featured: true,
    },
    {
      id: "ml-dashboard",
      name: "HOA-US Community Management Platform",
      shortDescription: "A full-stack HOA management platform for handling complaints, notices, documents, and resident communication in one secure system.",
      longDescription:
        "A full-stack web platform for managing Homeowners Associations, enabling residents and administrators to handle announcements, documents, complaints, and community operations through a centralized digital system with automated communication",
      techStack: ["React", "Node.js", "Firebase", "Firestore", "Email Service", "Tailwind CSS"],
      role: "Designed and developed the complete full-stack architecture including frontend UI, backend APIs, database structure, authentication, email notification system, and deployment. Handled security, performance optimization, and responsive design.",
      repoUrl: "https://github.com/your-username/ml-dashboard",
      liveUrl: "https://hoa-us.web.app/home",
      metrics: ["Live production deployment with real users", "Automated email notifications for complaints & updates", "Multi-role access control (Admin, Residents)","Centralized document, notice, and complaint management","Real-time data updates with secure authentication"],
    },
   
  ],

  experience: [
    {
      id: "exp-1",
      title: "Software Engineer (Mock)",
      company: "TechCorp Labs",
      period: "2023 – Present",
      location: "Remote",
      bullets: [
        "Built and maintained full-stack web applications using React, Next.js, and Node.js.",
        "Implemented real-time features with WebSockets and optimized API performance.",
        "Collaborated with designers and product managers to ship polished user experiences.",
      ],
      technologies: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"],
    },
    {
      id: "exp-2",
      title: "Backend Developer (Mock)",
      company: "DataStream.io",
      period: "2021 – 2023",
      location: "On-site",
      bullets: [
        "Designed RESTful APIs and data models for analytics workloads.",
        "Improved query performance by optimizing database indices and caching.",
      ],
      technologies: ["Node.js", "Express", "PostgreSQL", "Redis"],
    },
  ],

  education: [
    {
      id: "edu-1",
      degree: "B.E CSE",
      institution: "Chandigarh University",
      period: "2024 – 2028",
      bullets: [
        "Focused on algorithms, web development, machine learning, and team lead.",
        "Built several course projects in C++, Python, and React with real time application.",
      ],
    },
  ],

  social: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    twitter: "https://twitter.com/your-handle",
    email: "you@example.com",
  },
};
