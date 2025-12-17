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
  year?: string | number;
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
      id: "softgame-studio",
      name: "Soft Game Studio",
      shortDescription: "A production-focused startup building scalable web platforms, real-world systems, and client-ready products beyond academic projects.",
      longDescription:
        "Soft Game Studio is a startup focused on building real-world software products including web apps, backend systems, automation tools, and scalable platforms. As Co-Founder, I lead the core engineering, deployment workflows, and system architecture. The studio focuses on turning raw ideas into production-grade products used by real users.\n\n**Key Responsibilities:**\n\n*   Leading system architecture and backend design\n*   Full-stack development and production deployment\n*   Managing product execution and delivery pipelines\n*   Building scalable systems beyond academic scope",
      techStack: ["React", "Next.js", "Firebase", "Python", "Flask", "Node.js", "Tailwind", "Cloud Hosting"],
      role: "Co-Founder & Lead Engineer",
      year: 2025,
      liveUrl: "https://softgamestudios.web.app/",
      metrics: ["Live Startup", "Founder Project", "Production Systems", "Startup Platform"],
      featured: true,
    },
    {
      id: "portfolio",
      name: "0xSharik Portfolio",
      shortDescription: "A high-performance, animated developer portfolio showcasing real-world projects, startup work, and engineering depth with production-grade UI/UX.",
      longDescription:
        "This portfolio is a fully custom-built personal platform designed to present my engineering work, startup leadership, and technical expertise with clarity and impact. It features advanced UI animations, custom transitions, cinematic visual layers, and modular project architecture. The site is optimized for performance, scalability, and brand identity while serving as a live demonstration of my frontend, animation, and system design skills.",
      techStack: ["Next.js", "React", "TypeScript", "Vercel", "Framer Motion"],
      role: "Designed and implemented the full stack, from 3D scene architecture to UI components.",
      year: 2025,
      repoUrl: "https://github.com/0xSharik/my-portfolio",
      liveUrl: "https://0xsharik-portfolio.vercel.app/",
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
      year: 2025,
      repoUrl: "https://github.com/your-username/ml-dashboard",
      liveUrl: "https://hoa-us.web.app/home",
      metrics: ["Live production deployment with real users", "Automated email notifications for complaints & updates", "Multi-role access control (Admin, Residents)","Centralized document, notice, and complaint management","Real-time data updates with secure authentication"],
    },
    {
      id: "teckathon-cu-data-management",
      name: "Teckathon-CU Data Management Platform",
      shortDescription:
        "A Firebase-based form data management system with secure authentication, category-wise sorting, and one-click Excel export.",
      longDescription:
        "Teckathon-CU is a hobby-built data handling web platform focused on securely collecting and organizing structured form submissions. It uses Firebase Authentication for secure user access and dynamically sorts submitted data based on form categories. The platform allows administrators to instantly export category-wise datasets into Excel sheets, converting raw form inputs into clean, usable business data. The project demonstrates practical full-stack thinking with a strong focus on real-world data workflows.",
      techStack: ["Firebase", "React", "JavaScript", "Firebase Authentication", "Firestore "],
      role:
        "Independently designed and developed the complete system including frontend UI, Firebase authentication, real-time database integration, category-based data sorting logic, and Excel export functionality.",
      year: 2025,
      metrics: [
        "Secure user authentication with protected routes",
        "Dynamic form data categorization",
        "One-click Excel export based on form category",
        "Real-time database updates",
        "Scalable structure for multi-form data handling",
      ],
    },
    {
      id: "custudyhub",
      name: "CuStudyHub — Open Peer-to-Peer Study Sharing Platform",
      shortDescription:
        "An open study-material sharing platform where students upload resources without logging in, and verified content is published after admin approval.",
      longDescription:
        "CuStudyHub is a peer-to-peer study material sharing platform designed for zero-friction access. Students can upload documents without creating an account, after which submissions go through an admin verification process to ensure quality and authenticity. Once approved, materials are published publicly for everyone to browse and download. The platform includes automatic file compression for optimized storage and fast delivery, along with a clean and responsive frontend. Additional features and updates can be explored on the live site.",
      techStack: [
        "React ",
        "Firebase (Firestore, Storage)",
        "File compression pipeline",
        "JavaScript / TypeScript",
        "Responsive UI",
        "Cloud storage & data pipelines",
      ],
      role:
        "Full-stack developer — built upload workflow, admin verification system, file compression, cloud storage integration, public document browsing interface, and complete frontend architecture.",
      liveUrl: "https://custudyhub.web.app/",
      year: 2025,
      metrics: [
        "No-login uploads with admin verification",
        "Automatic file compression for optimized performance",
        "Secure cloud storage with public access",
        "Clean, responsive UI for upload and browsing",
        "Scalable document management system",
      ],
    },
    {
      id: "onepice-club",
      name: "Onepice-Club — Community Membership Platform",
      shortDescription: "A community-driven fan platform with full admin control to manage members, content, and access in real time.",
      longDescription:
        "Onepice-Club is a full-stack community platform designed to manage and showcase fan membership through a controlled backend system. The application allows administrators to add, edit, and delete member records securely, ensuring complete control over community data. The frontend is built for fast browsing, responsive interaction, and clean presentation, while the backend handles structured data updates in real time. The project demonstrates strong fundamentals in CRUD operations, state handling, admin access control, and deployment pipelines, making it both a functional product and a solid engineering showcase.",
      techStack: [ "React", "Firebase (Database + Hosting)", "JavaScript", "Tailwind CSS"],
      role: "Full-stack Developer — designed the UI, built member management backend (CRUD), connected real-time updates, handled deployment, and structured the project architecture.",
      liveUrl: "https://onepice-club.vercel.app/about",
      year: 2025,
      metrics: [
        "Admin can Add, Edit, and Delete members from backend",
        "Real-time data updates on the frontend",
        "Fully responsive UI for all devices",
        "Secure data handling and access control",
        "Optimized hosting with fast global delivery",
      ],
    },
    {
      id: "library-navigation-app",
      name: "Library Navigation App",
      shortDescription: "Mobile app to search, locate, and explore library books with a clean, theme-aware interface powered by Firebase.",
      longDescription:
        "Library Navigation App is a React Native / Expo application that lets users quickly search and browse a library’s book collection using a responsive, mobile-first interface. It pulls book data from Firestore and supports fast filtering by title and author, while also surfacing location metadata so users can see where a book lives inside the library. The app is wired to Firebase for both authentication and data access, with Firestore as the primary store for the books collection. A custom theme context powers light/dark mode, making the UI adaptable to user preference and more suitable for long reading or browsing sessions.",
      techStack: [
        "React Native",
        "Expo",
        "React Navigation",
        "Firebase (Auth, Firestore)",
        "React Context (ThemeContext)",
      ],
      role: "Sole developer: architecture, Firebase integration, navigation, theme system, and UI.",
      liveUrl: "https://librexx.vercel.app/",
      repoUrl: "https://github.com/0xSharik/LibraryNavigationApp",
      year: 2025,
      metrics: [
        "Searchable library catalog with filtering by title and author",
        "Book cards showing title, author and location metadata",
        "Firebase-backed data layer using Firestore",
        "Integrated Firebase Auth with AsyncStorage persistence",
        "Theme toggling via custom ThemeContext",
      ],
    },
    {
      id: "single-page-portfolio-template",
      name: "Single-Page Portfolio Template",
      shortDescription: "A sleek, responsive single-page portfolio template built with modern web technologies and ready for deployment.",
      longDescription:
        "Single-Page Portfolio Template is a clean, minimalist SPA template designed for developers to showcase their work. It features responsive design, smooth navigation, and modular sections (hero, about, projects, contact) — making it ideal as a base for personal portfolios. The project demonstrates proficiency in modern frontend tooling, deployment workflows, and project structuring for maintainable web apps.",
      techStack: ["React", "TypeScript", "CSS", "HTML5", "Vercel Hosting", "GitHub"],
      role: "Creator & Maintainer — built the layout, styling, responsiveness, routing structure, and deployment configuration. Ensured clean codebase and ease of customization for future use.",
      year: 2025,
      liveUrl: "https://single-page-portfolio-template.vercel.app/",
      repoUrl: "https://github.com/0xSharik/single-page-portfolio",
      metrics: [
        "Single-page layout with smooth section navigation",
        "Fully responsive across devices (desktop, tablet, mobile)",
        "Clean modular codebase for easy customization",
        "Live deployment on Vercel for instant access",
        "Minimal dependencies — optimized for performance and simplicity",
      ],
      featured: false,
    },
    {
      id: "pdf-compressor",
      name: "PDF Compressor (Python)",
      shortDescription: "A Python-based utility to compress PDF files, optimizing for size without losing readability — useful for sharing and storage efficiency.",
      longDescription:
        "PDF Compressor is a lightweight Python tool that reduces PDF file sizes while preserving document quality, making file transfers and storage easier. It's designed for simplicity and speed: just feed it a PDF, and it outputs an optimized version. The tool supports batch processing and is ideal for students or developers who need to compress documents before sharing or archival.",
      techStack: ["Python", "PyPDF2", "Command-line interface", "File I/O"],
      role: "Author & Maintainer — wrote the core compression logic, handled file I/O, optimized compression parameters, and managed distribution and documentation of the tool.",
      year: 2025,
      metrics: [
        "Compresses PDF files to reduce size",
        "Maintains readability and original layout",
        "Batch processing support for multiple files at once",
        "Easy to use — just run from command line",
        "Useful for document-heavy workflows, sharing or archiving PDFs",
      ],
    },
    {
      id: "attendance-management-mini-project",
      name: "Attendance Management Mini-Project",
      shortDescription: "A lightweight attendance tracking system that logs, manages, and displays attendance records with minimal setup — ideal for classrooms or small teams.",
      longDescription:
        "This project implements a simple Attendance Management system that allows administrators to register users and record their attendance over time. It handles CRUD operations for user data and attendance logs, organizes records efficiently, and provides an interface to view, filter, and export attendance data. The system demonstrates core back-end logic, data management, and basic UI work — offering a practical solution for tracking attendance without complex overhead.",
      techStack: ["Python", "Database", "HTML/CSS", "CRUD backend"],
      role: "Developer & Maintainer — implemented database schema, CRUD backend operations, attendance logging logic, and front-end interface for data display and management.",
      year: 2025,
      repoUrl: "https://github.com/0xSharik/attendance-management-mini-project",
      metrics: [
        "User registration and management",
        "Attendance logging per session or date",
        "Attendance record storage and retrieval",
        "View and filter attendance data",
        "Simple, minimal setup ideal for small-scale usage",
      ],
    },
    {
      id: "movie-recommendation-project",
      name: "Movie Recommendation Project",
      shortDescription: "An ML-powered movie recommendation system that suggests films based on user preferences and historical data.",
      longDescription:
        "The Movie Recommendation Project uses recommendation algorithms to suggest movies tailored to a user's tastes. By analyzing historical ratings or user inputs, the system predicts which movies a user might like, delivering personalized suggestions. The project showcases skills in data analysis, recommendation logic, and optionally — a user interface to browse or input preferences, making it a hands-on demonstration of machine learning integration in user applications.",
      techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Machine Learning"],
      role: "Data Scientist / Developer — prepared the dataset, built the recommendation engine (collaborative or content-based), implemented prediction logic, and built the interface (or script) for users to receive recommendations.",
      year: 2025,
      repoUrl: "https://github.com/0xSharik/movie-recommendation-project",
      metrics: [
        "Movie recommendation using data-driven ML algorithms",
        "Dataset preprocessing and feature extraction",
        "Personalized suggestions based on user history or preference input",
        "Demonstrates ML fundamentals and practical recommendation logic",
        "Extensible — can integrate with a web or mobile front-end for real-world use",
      ],
    },
    {
      id: "facerec-proctoring-v2",
      name: "FaceRec Proctoring System v2.0",
      shortDescription:
        "A high-performance enterprise proctoring system featuring a unique Dual-Loop Architecture for 60 FPS live monitoring and background AI verification.",
      longDescription:
        "A robust exam proctoring solution designed to solve the critical latency issues in AI monitoring. By engineering a decoupled 'Dual-Loop' architecture, the system separates high-speed video streaming (Fast Lane) from compute-intensive face verification (Slow Lane). This ensures administrators receive a fluid 60 FPS live feed while DeepFace performs rigorous anti-cheat checks—such as multiple face detection and identity verification—in the background without blocking the main event loop.",
      techStack: [
        "Python",
        "Flask",
        "DeepFace",
        "OpenCV",
        "React",
        "WebSockets",
        "Railway",
      ],
      role:
        "Architected the entire 'Dual-Loop' streaming protocol to eliminate video lag. Developed the Flask backend and custom binary frame-pushing mechanism. Integrated DeepFace for reliable identity verification and designed the responsive Admin Dashboard for real-time monitoring.",
      year: 2025,
      metrics: [
        "60 FPS Live Stream Latency (Dual-Loop)",
        "Real-time Multiple Face Detection",
        "Zero-Encoding Raw Binary Stream",
        "Cloud-Ready Railway Architecture",
        "Protected Admin Command Center",
      ],
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
