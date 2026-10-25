# PROGRESS.md — Project Status & Live Execution Log

## Current Phase
- **Phase**: Phase 1 — Project Foundation & Public Portfolio (Prompt 1 of 4)
- **Status**: COMPLETED & VERIFIED (Milestone: Dedicated Projects Archive, Mihir Das Details, Modern Skills & Video Showcase)
- **Current Task**: All public portfolio enhancements complete. Ready for Git push to `origin main` and transition to Phase 2 (Database, Authentication & Admin CMS).

---

## Milestone: Dedicated Projects Archive, Mihir Das Details, Modern Skills & Video Showcase

### Implemented Enhancements
1. **Projects Archive Page (`/[locale]/projects`)**:
   - Built interactive filterable Projects Archive (`src/components/sections/ProjectsArchiveGrid.tsx`) supporting category counts (`All`, `Full-Stack`, `DevOps & Cloud`, `Mobile App`).
   - Created dedicated route `src/app/[locale]/projects/page.tsx` with breadcrumbs (`Home / Projects`), category filtering, responsive 3-column cards, and bottom CTA banner.
   - Updated homepage "Projects & Case Studies" header with a prominent "See All Projects →" button linking directly to `/${locale}/projects`.
   - Preserves full browser back navigation and route-aware language switching.

2. **Project Details Pages (`/[locale]/projects/[slug]`) — Mihir Das Standard**:
   - Elevated project case study layout inspired by Mihir Das (`https://www.mihirdas.io/`):
     - Interactive terminal window mockup showcasing `slug.mehedi.dev` with live demo & repo links.
     - Architecture data flow walkthrough (`Client Requests → Edge Gateway → Microservices → Event Bus → MongoDB Atlas`).
     - Comparative "Challenge vs. Solution" cards with side-by-side technical breakdowns.
     - Quantified impact metrics (99.98% uptime, 42ms response, 100K+ events/sec).
     - Future roadmap section detailing next architectural evolutions.
     - Previous / Next project pagination links and sticky breadcrumbs navigation.

3. **Redesigned About Section**:
   - Redesigned `src/components/sections/AboutSection.tsx` matching `mehedi-dev-portfolio.vercel.app/#about`:
     - Clean profile identity card with verified metrics: 6+ Years Experience, 40+ Production Systems, 99.98% Architecture Uptime, B.Sc. CSE.
     - Core architectural focus chips (High-Concurrency Distributed Systems, Next.js Full-Stack, Cloud Infrastructure).
     - Narrative "Engineering Journey" and "Academic Foundation" split cards.
     - "Rule 0" engineering mindset callout.
     - 4-column modern engineering principles grid (Clean Code, Resilience, DX & Accessibility, Security First).

4. **Modern Skills Section**:
   - Overhauled `src/components/sections/SkillsSection.tsx`:
     - Eliminated arbitrary percentage progress bars (e.g., `95%`).
     - Organized into clean domain tabs: Frontend, Backend, Database, Cloud & DevOps.
     - Rendered high-fidelity official SVG logos in `src/components/ui/Icons.tsx` (React, Next.js, TypeScript, Node.js, Express, Tailwind, MongoDB, PostgreSQL, Redis, Docker).
     - Clean status badges: `Core Architecture`, `Production`, and production highlight tags.

5. **Interactive Video Showcase Section**:
   - Created `src/components/sections/VideoShowcaseSection.tsx` inspired by Mihir Das's WordPress solutions showcase:
     - Terminal mockup wrapper with duration tag (`12:40`), category badge, and active status indicator.
     - Centered glowing Play button with smooth hover scale and ripple effects.
     - Interactive chapters progress bar with timestamped video segments.
     - Modal player with placeholder notification for Phase 2 Cloudinary media integration.

6. **Phase 2 Admin Panel CMS Data Contracts**:
   - Designed clean data structures in `src/data/dictionaries.ts` and `portfolio-data.ts` to ensure 100% plug-and-play MongoDB synchronization in Phase 2:
     - `Project`: bilingual titles/descriptions, tech stack, category, metrics, case study (challenge, solution, data flow, roadmap).
     - `About`: bio, verified stats, focus chips, journey, principles.
     - `Skill`: category, icon key, status tag, highlight.
     - `VideoShowcase`: title, duration, category, chapters, video URL.

---

## Milestone: Desktop Readability & Content Width Improvements

### Implemented Enhancements
1. **Desktop Body Typography**:
   - Body font-size raised from implicit 16px to `1.0625rem` (~17px) at `lg:` breakpoints, with `line-height: 1.7` for comfortable reading.
   - All `p` elements set `line-height: 1.7` globally.
   - Mobile stays at 16px / 1.6 — existing mobile readability preserved.
2. **Desktop Container Width** (1360px max, 24–40px balanced padding):
   - All section containers (`HeroSection`, `AboutSection`, `SkillsSection`, `ExperienceSection`, `ProjectsSection`, `EducationSection`, `BlogSection`, `ContactSection`) updated from `max-w-7xl` (1280px) to `max-w-[1360px]` with `xl:px-10` (40px) side padding.
   - Navbar and Footer also widened to match at `max-w-[1360px]`.
   - Blog and Project detail pages widened (`max-w-3xl xl:max-w-4xl`, `max-w-4xl xl:max-w-5xl`).
   - Mobile layout (down to 360px) unchanged — `px-4` still applies at small viewports.
3. **Section Content Readability**:
   - Section subtitle/description paragraphs: raised from `text-sm sm:text-base` to `text-sm sm:text-base lg:text-[17px]` with `max-w-3xl` (previously `max-w-2xl`) to allow wider, more readable text blocks.
   - Card body text in `AboutSection`, `ExperienceSection`, `EducationSection`, `ProjectsSection`, `BlogSection`: raised to `text-sm sm:text-base lg:text-[17.5px]` with `leading-[1.72]`.
   - Achievement bullet lists, experience descriptions, and bio paragraphs: raised to `lg:text-[15.5px]–[17px]`.
   - Card headers and skill/education item titles: raised to `sm:text-lg` for visual hierarchy.
4. **Fonts Confirmed Loading via CSS @import**:
   - `globals.css` retains `@import url(...)` for Inter, Hind Siliguri, and Fira Code at line 1.
   - Preconnect `<link>` tags in `layout.tsx` remain for DNS prefetch performance.
   - No ESLint warnings — `0 errors, 0 warnings`.

### Verification Outcomes
1. **Lint**: `npm run lint` → **0 errors, 0 warnings** (exited code 0).
2. **Production Build**: `npm run build` → **18/18 static pages generated in 669ms** (exited code 0).
3. **TypeScript**: All types clean — no type errors in compilation.
4. **Mobile (360px)**: Padding stays at `px-4` (16px); no horizontal overflow introduced.
5. **Bilingual**: `/en` and `/bn` routes both prerendered cleanly.

---

### Implemented Enhancements
1. **Font Standardization**:
   - **English**: Configured `Inter` across all public views, project detail pages, and components.
   - **Bangla**: Configured `Hind Siliguri` across `.locale-bn` and `[lang="bn"]` elements with generous `line-height: 1.75` and letter-spacing to prevent visual diacritic clipping.
   - **Monospace Elements**: Terminal window headers, code snippets, status badges, and metrics retain `Fira Code` with `ui-monospace` fallbacks.
   - Preconnect links for Google Fonts added to root `<head>`.
2. **Dark / Light Theme System**:
   - **One-Click ThemeToggle**: Sun/Moon toggle with Lucide icons. Uses `React.useSyncExternalStore` observing `document.documentElement` class changes for tear-free, hydration-safe state synchronization.
   - **Anti-FOUC Inline Script**: Synchronous script injected into `<head>` reads `localStorage.getItem('theme')` or `window.matchMedia('(prefers-color-scheme: dark)')` to set `html.dark` or `html.light` prior to first paint.
   - **Comprehensive Light Theme**: Clean, accessible palette with high contrast (`#f8fafc` background, `#0f172a` text, `#ffffff` cards, subtle borders, light terminal grid textures, and preserved dark terminal consoles for code blocks).
3. **Responsive Navbar with Mobile Overflow Menu**:
   - **Desktop (`lg:flex`)**: Language Switcher + Theme Toggle + Resume CTA button clearly presented in the header controls area.
   - **Mobile Viewports (<1024px, including 360px)**: Language Switcher and Theme Toggle tucked neatly into a compact three-dot (`⋮`, `MoreVertical`) overflow menu.
   - **Separation of Concerns**: Hamburger menu strictly contains section navigation links; three-dot overflow menu houses user preferences.
   - **Usability & Accessibility**: Independent popover states, mutual close on alternating menu trigger, outside-click listener, Escape key dismissal, and ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-label`).

### Verification Outcomes
1. **Lint**: `npm run lint` -> **0 errors, 0 warnings** (exited code 0).
2. **Production Build**: `npm run build` -> **18/18 static pages generated in 925ms** (exited code 0).
3. **Backend Build**: `npm --prefix backend run build` -> **TypeScript compilation exited code 0**.
4. **Live Probes**: Verified HTTP 200 on `/en` and `/bn`, checked anti-FOUC script injection, mobile popover elements, and responsive layout styling.

---

## Urgent Hotfix: Styling & Layout Rendering Issue

### Root Cause Analysis
1. **Missing PostCSS Pipeline for Webpack**: The project relies on Tailwind CSS v4 (`tailwindcss@^4`). When compiling with Webpack, Next.js requires `@tailwindcss/postcss` and a PostCSS configuration file (`postcss.config.mjs`). Without this, Next.js was outputting raw unparsed CSS containing the literal string `@layer utilities{@tailwind utilities}` without evaluating or generating any Tailwind utility classes. As a result, none of the layout, spacing, colors, or responsive classes (`max-w-7xl`, `mx-auto`, `flex`, `grid`, `bg-slate-900`, `text-emerald-400`, etc.) were present in the compiled CSS bundle.
2. **Infinite Symlink Loop in Scanner**: During npm operations inside `backend/`, npm created a symlink `backend/node_modules/mehedi-portfolio` pointing back to the repository root. Tailwind v4's default file scanner encountered this recursive symlink, causing infinite directory loops when traversing file paths.
3. **Multi-Worker Concurrency Lock on Windows**: Parallel prerendering workers (8 workers) on Windows NTFS were competing to create `.segments/` directory paths, causing transient `EPERM: operation not permitted, mkdir` errors during static exports.

### Corrective Actions Applied
1. **Installed Official PostCSS Plugin**: Added `@tailwindcss/postcss` to devDependencies.
2. **Created PostCSS Configuration**: Created `postcss.config.mjs` exporting the `@tailwindcss/postcss` plugin configuration.
3. **Explicit Source Scanning Directives**: Configured `@source "../**/*.{ts,tsx}";` in `src/app/globals.css` ensuring Tailwind scans only the frontend UI component tree.
4. **Eliminated Recursive Symlink**: Removed the circular `backend/node_modules/mehedi-portfolio` link.
5. **Configured Single Worker for Prerender Stability**: Set `experimental.cpus: 1` in `next.config.ts` to eliminate Windows directory locking conflicts during static page export.

### Visual Styling & Technical Verification
1. **CSS Generation Check**:
   - The compiled production CSS bundle size increased from 22 KB (unparsed boilerplate) to **54 KB** of complete, minified Tailwind v4 utility and theme rules.
   - Verified that `.max-w-7xl` (`max-width: 80rem`), `.mx-auto`, `.flex`, `.grid`, `.bg-slate-900`, `@media (min-width: 640px)`, and keyframe animations are present in `.next/static/css/703b8dc945010c4b.css`.
2. **Live HTTP Server Probe**:
   - Started the Next.js production server and probed `http://localhost:3000/en` and `http://localhost:3000/bn`.
   - Both returned HTTP 200 with complete HTML payloads linking directly to `/_next/static/css/703b8dc945010c4b.css`.
   - The document body includes `<body class="min-h-full flex flex-col bg-[#0a0d14] text-slate-100 ...">` and all centered containers `<div class="mx-auto flex h-16 max-w-7xl items-center ...">`.
3. **Lint & Build Verification**:
   - `npm run lint`: **0 errors, 0 warnings**.
   - `npm run build`: **18/18 static pages successfully prerendered (code 0)**.

---

## Changed Files in Hotfix
- `package.json`: Added `@tailwindcss/postcss` dependency.
- `package-lock.json`: Updated dependency tree.
- `postcss.config.mjs`: New PostCSS configuration for Tailwind CSS v4.
- `next.config.ts`: Configured `experimental.cpus: 1` for Windows static export stability.
- `src/app/globals.css`: Added `@source` directives targeting component and page files.
- `PROGRESS.md`: Documented root cause and verification logs.

---

## Exact Next Action
- Await **Prompt 2** from the user to proceed to **Phase 2: Database Models, Authentication & Admin CMS**.
