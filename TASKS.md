# TASKS.md — Master Feature Checklist

Legend:
- [x] Completed
- [/] In Progress
- [ ] Pending
- [!] Blocked

---

## Phase 1: Project Foundation & Public Portfolio (Prompt 1) — COMPLETED

### 1. Repository Setup & Architecture
- [x] Inspect existing Next.js project structure, Git remotes, branches, and dependencies.
- [x] Configure root Next.js with TypeScript, Tailwind CSS v4, and shadcn-style component utilities.
- [x] Exclude backend from root tsconfig to prevent build collisions.
- [x] Create and configure `backend/` directory with Express, TypeScript, tsconfig, and package.json.
- [x] Maintain `.gitignore` with strict exclusion of node_modules, build artifacts, and secret env files while allowing `.env.example`.
- [x] Create comprehensive `.env.example` for frontend and `backend/.env.example`.
- [x] Author core documentation files: `AGENTS.md`, `PROGRESS.md`, `TASKS.md`.

### 2. Bilingual Architecture & Core Routing
- [x] Implement locale-prefixed routing (`/en` and `/bn`) with automatic root redirect.
- [x] Implement bilingual dictionary data structures (`en` and `bn`) with explicit fallback policy.
- [x] Standardize website-wide typography: `Inter` for English, `Hind Siliguri` for Bangla with unclipped diacritics (`line-height: 1.75`), and `Fira Code` for terminal consoles.
- [x] Implement dynamic language switcher preserving current route, anchor, and state.
- [x] Generate localized SEO metadata and hreflang alternate links for all pages.

### 3. UI/UX Design System & Reusable Components
- [x] Implement terminal-inspired dark developer theme and high-contrast polished light theme.
- [x] Add Sun/Moon one-click theme toggle with persistent `localStorage`, OS preference detection, and inline anti-FOUC script.
- [x] Implement responsive navbar: desktop shows language switcher and theme toggle; mobile viewports collapse both into a compact three-dot (`⋮`) overflow menu.
- [x] Improve desktop readability: body font 17px at `lg:`, line-height 1.7, section paragraph text raised to 17–17.5px.
- [x] Expand desktop content container from `max-w-7xl` to `max-w-[1360px]` with 40px balanced side padding; all sections, navbar, footer, and detail pages updated.
- [x] Build shadcn-inspired primitives: `Button`, `Card`, `Badge`, `Input`, `Textarea`, `Modal`, `Icons`.
- [x] Build responsive layout components: `Navbar`, `Footer`, `LanguageSwitcher`, `ThemeToggle`.
- [x] Build prominent Hero section with profile photo, terminal status box, CTA buttons, and social links.
- [x] Build About section with professional summary, core philosophy, and principles cards.
- [x] Build Skills section categorized by domain (Frontend, Backend, DevOps, Architecture, Database) with animated progress bars.
- [x] Build Experience section with interactive timeline, achievement bullets, and technology badges.
- [x] Build Education & Certifications section with coursework tags.
- [x] Build Projects & Case Studies section with live demo, GitHub links, and detail modals.
- [x] Build Blog preview section with reading time and tag filters.
- [x] Build Contact section with interactive inquiry form, validation, direct channels, and availability status.
- [x] Build floating profile-photo chat assistant with interactive predefined Q&A dialog (supporting English & Bangla).

### 4. Backend Foundation (Express + MongoDB)
- [x] Initialize Express application in `backend/src/index.ts` with CORS, JSON parser, and security middleware.
- [x] Implement MongoDB Atlas connection manager with retry logic, pooling, and graceful shutdown.
- [x] Implement health check endpoint (`GET /api/health`).
- [x] Create TypeScript interfaces and Mongoose schemas supporting bilingual sub-documents (`Project`, `BlogPost`, `Skill`, `Experience`, `Message`, `AssistantQA`, `User`).
- [x] Implement centralized error handling middleware.
- [x] Implement public portfolio routes (`GET /api/projects`, `GET /api/projects/:slug`, `POST /api/messages`) with graceful fallback mode.

### 5. Simplified & Visual Projects Experience
- [x] Homepage Projects section: exactly 4 featured project cards, 3 columns on desktop (4th card wraps naturally), simple "Featured Projects" heading, and "View All Projects" link.
- [x] Removed category filter tabs, statistical counters, and dashboard-style clutter from homepage and archive.
- [x] Unified 16:9 aspect-ratio `ProjectCard` component with screenshot area, domain bar, concise title/description, tech tags, and Details/Live Demo/Code actions.
- [x] View All Projects page (`/[locale]/projects`) displaying all real projects in a consistent, compact responsive grid with back navigation.
- [x] Individual project details pages (`/[locale]/projects/[slug]`): prominent 16:9 preview mockup, plain-English overview, key features with checkmarks, actual technology stack, and verified live/code links without unnecessary jargon.
- [x] Redesigned About section with profile identity card, verified metrics (6+ Years, 40+ Systems, 99.98% Uptime, B.Sc. CSE), core focus chips, narrative journey & academic cards, Rule 0 callout, and 4-column engineering principles grid.
- [x] Redesigned Skills section eliminating fake percentage bars; organized into clean category tabs with recognizable SVG logos (React, Next.js, TypeScript, Node, Tailwind, Mongo, Docker, Postgres, Redis, Express) and production status tags.
- [x] Scroll-driven 3D MacBook video showcase section animating smoothly across initial (screen lid), intermediate (3D tilt lift), and final (foreground flat expanded) states with temporary local CC0 video asset.

### 6. Verification & Git
- [x] Run root Next.js ESLint (`npm run lint` -> 0 errors, 0 warnings).
- [x] Run root Next.js production build (`npm run build` -> 18/18 static pages generated cleanly).
- [x] Run backend TypeScript compilation (`npm --prefix backend run build` & `npm --prefix backend run typecheck` -> 0 errors).
- [x] Verify mobile responsiveness down to 360px viewport width.
- [x] Create structured Git commits and push to `origin main`.
- [x] Update `PROGRESS.md` and `TASKS.md` with final Phase 1 verification results.

---

## Phase 2: Database Models, Authentication & Admin CMS (Prompt 2 — Upcoming)
- [ ] Secure JWT authentication and role-based access control (Admin / Read-Only Demo).
- [ ] Database-driven Admin Dashboard for managing portfolio content.
- [ ] Cloudinary media upload integration with drag-and-drop media library.
- [ ] CRUD interfaces for Projects, Case Studies, Skills, Experience, and Education.
- [ ] Read-only demo account with isolated test data.

---

## Phase 3: Blog CMS, Dynamic Assistant & Contact Inquiries (Prompt 3 — Upcoming)
- [ ] Rich Markdown / MDX blog authoring with preview and syntax highlighting.
- [ ] Predefined Q&A assistant with database-driven Q&A pairs and category browsing.
- [ ] Working contact form with database storage and email notification triggers.
- [ ] Admin message inbox with unread counts, status tags, and reply actions.

---

## Phase 4: Production Polish, SEO, Performance & Deployment (Prompt 4 — Upcoming)
- [ ] Dynamic sitemap.xml and robots.txt generation for all localized routes.
- [ ] Open Graph & Twitter dynamic preview cards.
- [ ] Rate limiting, audit logs, and security headers (Helmet, CSRF protection).
- [ ] Production build optimization, caching strategies, and deployment documentation.

