# Multi-Page Portfolio (Next.js 14, TypeScript, R3F, Page Transitions + 3D Loader)

## Project Summary
Build an Awwwards-grade, multi-page portfolio for a Computer Science Engineer (C++ · ML · Networking) using Next.js 14 App Router + TypeScript (strict). The site must have a single persistent 3D canvas (React Three Fiber) that remains mounted across route transitions, a polished interactive 3D loading experience, and seamless page transitions driven by Framer Motion + GSAP where appropriate. Mobile must fall back to a low-energy static shader or image.

## Non-Negotiable Tech Stack & Constraints
- **Framework**: Next.js 14+ (App Router, app/ directory)
- **Language**: TypeScript — strict: true
- **Styling**: Tailwind CSS v3.4+, JIT config, utility-first + component tokens
- **3D**: React Three Fiber (r3f) + @react-three/drei + three.js
- **Animations**: Framer Motion for route/layout transitions; GSAP for complex timelines
- **Smooth scroll**: Lenis wired at top-level provider in layout.tsx
- **UI**: shadcn/ui for primitives + Aceternity UI for visual effects
- **Forms**: React Hook Form + Zod for schema validation
- **Assets**: GLB/GLTF models, Draco-compressed, <1MB preferred
- **Performance**: Dynamic imports for heavy components, persistent canvas
- **Accessibility**: Server-rendered metadata, semantic HTML, accessible focus states
- **Architecture**: Atomic design (atoms/, molecules/, organisms/, scenes/, layouts/, pages/)

## UX / Visual Brief
- **Theme**: Cyberpunk / Futuristic Minimalism — dark by default, neon accents, glassmorphism, subtle film grain
- **Layout**: Bento grid for projects, large negative space, crisp typography (Geist Sans)
- **Motion**: Smooth micro-animations, route transitions feel like moving through single canvas
- **Tone**: Confident, technical, refined — interactions communicate engineering rigor

## Global Components & Behaviors

### Persistent 3D Canvas
- Client-only R3F canvas mounted in app/layout.tsx
- Persistent across route changes (no remount)
- Overlay UI layer for HTML content above canvas

### Interactive 3D Loader
- Short, interactive 3D loading scene (particle sphere → morph → hero object)
- Blocks route hydration until critical assets loaded
- Interactive mouse/touch response while loading
- Uses drei useProgress & Suspense
- GSAP timeline for morph-out + Framer Motion overlay fade

### Page Transitions
- Framer Motion AnimatePresence for overlays and UI
- Coordinated UI + 3D scene changes (camera movement, lighting shift)
- Route transition manager to notify canvas of state changes
- Graceful non-js fallback with server HTML + static hero image

### Custom Cursor & Magnetic UI
- Subtle trailing cursor that becomes magnetic near interactive elements
- CSS transforms + requestAnimationFrame
- Disabled on touch devices

### Magnetic Navbar
- Floating dock-style nav (top/bottom center) using Framer Motion
- macOS dock behavior (icons enlarge as pointer nears)
- Responsive and collapsible on mobile

### Smooth Scrolling
- Lenis integrated at layout.tsx level
- Synchronized with Framer Motion/GSAP scroll-trigger animations

## Pages & Key Behaviors

### / — Home (Hero)
- Fullscreen hero with 3D interactive element (particle sphere/laptop/keyboard)
- Reacts to pointer movement
- Typewriter/scramble reveal for "Sharik Hasan — CS Engineer"
- CTA buttons: "Projects" and "Contact" with route transitions + coordinated camera moves

### /about
- 3D floating spherical tag-cloud (skill tags around sphere)
- Hover/click tags to show detail cards
- Interactive timeline: vertical, scroll-triggered experience/education reveal
- Timeline markers pulse from 3D scene

### /projects
- Bento grid gallery with 3D previews
- Hover card → 3D shader preview or GLB preview with animation
- Project slots: Handwriting Recognition ML Model and Train Traffic DSS
- Click project → detail overlay (modal) without canvas unmount

### /contact
- 3D interactive globe or low-poly phone reacting to cursor
- Contact form with React Hook Form + Zod
- Success: confetti + 3D success bloom in canvas
- Form posts to serverless endpoint with optimistic UI

## Architecture & Code Conventions

### Root Layout Structure
- app/layout.tsx handles global providers:
  - LenisProvider
  - ThemeProvider
  - Shadcn UI Provider
  - Global Canvas provider
  - RouteTransitionProvider bridging router events to canvas

### Scene Organization
- Scene logic in scenes/ as composable components:
  - HeroScene
  - TagCloudScene
  - ProjectsPreviewScene
  - ContactScene
- Dynamic imports for all scenes
- Suspense and progressive hydration for 3D assets

### Route Transition API
- useRouteTransition() hook emitting enter/leave events
- Canvas listens and animates cameras/lights accordingly
- No canvas remount on navigation

## Performance & Mobile Fallback
- Lazy-load models with Draco compression
- Low-energy fallback: prefers-reduced-motion or <768px → static shader/screenshot
- <200ms TTI for critical path
- next/image for images

## Deliverables & Acceptance Criteria

### Deliverables
- Task-ready repo skeleton (Next.js 14 + TypeScript strict + Tailwind)
- app/layout.tsx with all providers
- Persistent R3F canvas wrapper (client-only dynamic import)
- Framer Motion AnimatePresence for top-level transitions
- Global route-transition hook wiring
- components/canvas/HeroScene.tsx (dynamically imported, client-only)
- Working Home page with shared canvas + UI overlays
- Example implementations for /about, /projects, /contact
- README with run/build instructions

### Acceptance Criteria
- 3D canvas remains mounted during navigation (no flicker)
- Interactive 3D loader shows until models loaded, then morphs to hero
- Route transitions trigger coordinated UI + canvas animations
- Mobile respects prefers-reduced-motion with low-energy fallback
- Strict TypeScript compilation passes
- All heavy 3D imports use next/dynamic with SSR disabled
- Forms validate with Zod; success triggers 3D animation

## Optional Extras
- Preload critical GLB via <link rel="preload">
- Lighthouse and bundle-splitting guidance
- Local dev script for Draco compression

## Implementation Phases

### Phase 1: Foundation
1. Initialize Next.js 14 project with TypeScript strict
2. Configure Tailwind CSS with JIT
3. Set up shadcn/ui and Aceternity UI
4. Create basic file structure (atoms/, molecules/, organisms/, scenes/)
5. Configure ESLint, Prettier, TypeScript strict mode

### Phase 2: Core Architecture
1. Implement app/layout.tsx with all providers
2. Create RouteTransitionProvider and hook
3. Implement persistent CanvasProvider with client-only dynamic import
4. Set up Lenis smooth scroll integration
5. Create basic scene structure and loading system

### Phase 3: 3D Loader & Hero Scene
1. Implement interactive 3D loader with useProgress
2. Create HeroScene with particle sphere/keyboard interaction
3. Implement loader morph animation to hero state
4. Add typewriter/scramble text reveal
5. Implement custom cursor and magnetic effects

### Phase 4: Page Implementation
1. Create /about page with tag-cloud scene and timeline
2. Implement /projects page with bento grid and 3D previews
3. Create /contact page with interactive globe and form
4. Implement route transition animations
5. Add mobile fallback logic

### Phase 5: Polish & Optimization
1. Add micro-interactions and hover states
2. Implement form validation with Zod
3. Add success animations and confetti
4. Optimize bundle size and performance
5. Test accessibility and SEO
6. Add final touches (film grain, neon accents, glassmorphism)
