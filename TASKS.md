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
- [x] Streamlined Hero section removing all fake statistics and terminal blocks; focused on clean name, role, friendly intro, and direct links.
- [x] Simplified About section with balanced 2-column layout (dedicated profile photo placeholder on one side, concise human introduction on the other).
- [x] Simplified Skills section into 3 clean groups (Frontend, Backend & Database, Tools & Platforms) with recognizable SVG logos and zero fake percentages.
- [x] Fixed Laptop Video Showcase: eliminated heading overlap, resolved screen bezel alignment, and corrected 3D Z-layering so the keyboard never covers the video.

---

## Phase 2: Backend, Database, Authentication & Account Settings (Prompt 2) — COMPLETED

### 1. Configuration & Security Infrastructure
- [x] Centralized environment configuration and safe startup validation logging only missing variable NAMES (`backend/src/config/env.ts`).
- [x] Resilient MongoDB Atlas connection management and readiness probe without exposing secrets (`backend/src/config/db.ts`, `backend/src/routes/health.ts`).
- [x] Security headers with Helmet and strict CORS validation against frontend origin.
- [x] Rate limiting: authentication limiter (10 attempts / 15m), sensitive action limiter (15 requests / 15m), and contact form limiter (10 submissions / hr).
- [x] Centralized Zod request validation schemas and error formatting (`backend/src/validation/schemas.ts`).

### 2. Comprehensive Data Models
- [x] `User`: Owner/admin accounts with bcryptjs salt-12 hashing, tokenVersion tracking, role enforcement, and excluded password hashes.
- [x] `Session`: Active login session tracking with MongoDB TTL expiration.
- [x] `SiteSettings`: Global configuration (active sections, navigation, video showcase settings, global SEO).
- [x] `Profile`: Professional bio, contact info, localized summaries, social links, resume URL.
- [x] `Project`: Bilingual project records with case studies, tech stack, and category indices.
- [x] `BlogPost`: Bilingual articles, tags, read times, and publication states.
- [x] `Skill`: Categorized competencies with order indices.
- [x] `Experience` & `Education`: Localized career timeline and academic achievements.
- [x] `Certification`: Professional credentials with verified URLs.
- [x] `MediaAsset`: Media metadata references and Cloudinary identifiers.
- [x] `Page`: Custom localized pages with SEO metadata.
- [x] `Message`: Contact inquiries with status tracking, audit logging, and IP attribution.
- [x] `AssistantQA`: Bilingual assistant questions and structured answers.
- [x] `AuditLog`: Security audit trails (logins, password changes, email changes, settings modifications).

### 3. Authentication & Account Management
- [x] JWT token generation with user claims, role, and cryptographic tokenVersion check (`backend/src/middleware/auth.ts`).
- [x] HTTP-only secure cookie support (`mehedi_admin_token`) with cross-domain fallback to Bearer header.
- [x] Token revocation: advancing `tokenVersion` on password or email change instantly invalidates all existing sessions.
- [x] Dedicated owner login endpoint (`POST /api/auth/login`) with audit logging.
- [x] Session status endpoint (`GET /api/auth/me`).
- [x] Session logout endpoint (`POST /api/auth/logout`) clearing authentication cookies.
- [x] Change password endpoint (`POST /api/auth/change-password`) with mandatory current password verification and session invalidation.
- [x] Change email endpoint (`POST /api/auth/change-email`) with mandatory current password re-authentication and duplicate email protection.
- [x] Safe initial owner setup endpoint (`POST /api/auth/setup-initial-admin`) locked permanently once any user exists.
- [x] Startup auto-seeding support via optional environment variables (`ADMIN_INITIAL_EMAIL`, `ADMIN_INITIAL_PASSWORD`).

### 4. Frontend Integration
- [x] Centralized typed API client (`src/lib/api-client.ts`) with custom error classes and credentials management.
- [x] Dedicated Admin Login page (`/admin/login`) matching the developer terminal aesthetic with loading, error, and initial setup modes.
- [x] Dedicated Account Settings portal (`/admin/settings`) with Change Password, Change Email, Session Info, and live Health check.
- [x] Root admin redirect (`/admin`) routing to settings or login.

### 5. Verification & Testing
- [x] Automated backend test suite (`backend/src/__tests__/auth-and-api.test.ts` -> 8/8 tests passed).
- [x] Frontend ESLint verification (`npm run lint` -> 0 errors, 0 warnings).
- [x] Frontend production build (`npm run build` -> 23/23 static pages generated cleanly).
- [x] Backend TypeScript typecheck and build (`npm --prefix backend run typecheck` & `build` -> 0 errors).
- [x] Environment documentation in root `.env.example` and `backend/.env.example`.

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
- [ ] Production build optimization, caching strategies, and deployment documentation.
