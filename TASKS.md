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

## Phase 3: CMS Modules, Video Integration & Content Hardening (Prompt 3) — COMPLETED

### 1. Robust JSON Parsing & Safe Media Fallbacks
- [x] Fix `Unexpected end of JSON input` in `src/lib/api-client.ts` with safe empty response handling (HTTP 204, empty strings, non-JSON text errors).
- [x] Resolve broken image paths (`distributed-cms.png`, `telemetry-dash.png`, `cloud-api-gateway.png`) with clean, graceful SVG fallback architecture.
- [x] Eliminate circular junction at `backend/node_modules/mehedi-portfolio` permanently by removing `mehedi-portfolio: file:..` from `backend/package.json`.

### 2. Video Showcase Integration
- [x] Responsive Google Drive iframe player integration (`src/components/sections/VideoShowcaseSection.tsx`) with automatic embed URL conversion (`backend/src/utils/googleDrive.ts`).
- [x] Dual-mode video controls: native HTML5 playback controls with seek bar, duration readout, and mute/volume for direct video sources; clean embed player for Google Drive.
- [x] Complete Admin Video Management portal (`/admin/video`) controlling headline, description, source type, and URL.

### 3. Dynamic Section Management
- [x] Dynamic section visibility system (`/admin/sections`): toggling sections immediately updates homepage rendering without empty gaps.
- [x] Synchronized navigation bar links (hidden sections are dynamically omitted from desktop navbar and mobile menus).
- [x] Section ordering and metadata persisted to database with fallback to default layout.

### 4. Full Admin CMS Modules
- [x] Projects CMS (`/admin/projects`): Add, edit, reorder, delete, and feature projects with localized content.
- [x] Skills CMS (`/admin/skills`): Manage domain categories and proficiency badges.
- [x] Blog CMS (`/admin/blog`): Author and publish bilingual markdown articles.
- [x] Messages Inbox (`/admin/messages`): View, filter, mark read, and archive inquiries.
- [x] Assistant Training CMS (`/admin/assistant`): Train predefined Q&A pairs for the floating chat assistant.
- [x] Media Manager (`/admin/media`): Upload, preview, and organize Cloudinary & local assets.

---

## Phase 4: Full Integration, Security, Testing & Deployment (Prompt 4) — COMPLETED

### 1. Admin Authentication Hardening
- [x] Implement dual authentication transmission: `Authorization: Bearer <token>` in `localStorage` + `credentials: "include"` for HTTP-only cookies in `src/lib/api-client.ts`.
- [x] Global Admin Route Guard in `src/app/admin/layout.tsx` checking `authApi.getMe()` and redirecting unauthenticated users to `/admin/login` with loading spinner.
- [x] Add discreet footer shield link leading to `/admin`.
- [x] Remove all `any` types and add generic type parameters across all `adminApi` fetch calls.

### 2. Search Engine Optimization & Crawlers
- [x] Author dynamic `src/app/robots.ts` disallowing `/admin/`, `/api/`, `/_next/` and referencing `sitemap.xml`.
- [x] Author dynamic `src/app/sitemap.ts` covering `/en`, `/bn`, `/en/projects`, `/bn/projects`, localized project detail pages, and localized blog articles with alternate language links.

### 3. Environment & Deployment Documentation
- [x] Comprehensive, production-grade `README.md` authoring:
  - Architecture overview and monorepo structure.
  - Step-by-step local development setup.
  - Frontend (`.env.local`) and Backend (`backend/.env`) variable tables.
  - Vercel and Render/Railway production deployment guidelines.
  - Security guidelines (zero secrets in repo, CORS, JWT revocation).
- [x] Sanitized `.env.example` and `backend/.env.example` templates.
- [x] Verified gitignore rules (`git check-ignore backend/.env .env.local` confirming zero secret exposure).

### 4. Automated Testing & Production Builds
- [x] Frontend ESLint: `npm run lint` (0 errors, 0 warnings).
- [x] Backend TypeScript Typecheck: `npm --prefix backend run typecheck` (0 errors).
- [x] Backend Unit/Integration Tests: `npm --prefix backend test` (10/10 tests passed).
- [x] Backend Production Build: `npm --prefix backend run build` (0 errors).
- [x] Frontend Production Build: `npm run build` (34/34 static & SSG routes generated cleanly).


---

## Phase 5: CMS Integration, Dynamic Sectioning, Theme Polish & Resume — COMPLETED

### 1. End-to-End CMS to Public Website Pipeline
- [x] Eliminate stale SSG caching: configure `export const dynamic = "force-dynamic"` and `export const revalidate = 0` on public pages so Admin CMS updates appear immediately without code redeployments.
- [x] Configure server-side API requests with `cache: "no-store"` in `src/lib/api-client.ts`.
- [x] Synchronize profile schema in MongoDB with `avatarAlt`, `aboutPhotoAlt`, and bilingual `greeting`, `summary`, and `aboutTitle`.
- [x] Return complete bilingual `profile` object in `GET /api/public-settings`.
- [x] Implement public endpoints `GET /api/blog` and `GET /api/blog/:slug` with fallback data.

### 2. Complete Home & About Section Content Management
- [x] Home Page Admin controls (`/admin/profile` -> Hero Tab): direct PC upload for avatar image, live preview, remove/replace controls, accessibility alt text, and bilingual greeting/summary/title fields.
- [x] About Section Admin controls (`/admin/profile` -> About Tab): direct PC upload for workspace image, live preview, remove/replace controls, accessibility alt text, and bilingual headline/bio paragraphs editor.
- [x] Public rendering: `HeroSection` and `AboutSection` consume live profile data with graceful fallbacks.

### 3. Dynamic Sequential Section Numbering & Laptop Video
- [x] Implement dynamic continuous section numbering (`01.`, `02.`, etc., and Bengali `০১.`, `০২.`, etc.) in `src/app/[locale]/page.tsx` for all active sections.
- [x] Ensure toggling or reordering sections leaves zero gaps, zero broken numbers, and zero unwanted whitespace.
- [x] Video Showcase: connected to MongoDB settings with laptop shell, animations, seeking/volume controls, and robust fallback for missing/broken video sources.

### 4. Theme Polish & SVG High-Contrast Fixes
- [x] Scope light-mode `.text-white` rule to `:not(svg):not(svg *).text-white` in `src/app/globals.css` to prevent corrupting SVG logos.
- [x] Ensure high-contrast fills for `NextjsLogo`, `ExpressLogo`, and `NodeLogo` in `src/components/ui/Icons.tsx` across both light and dark themes.
- [x] Remove Globe icon next to language selector in `LanguageSwitcher.tsx` and Navbar popover.
- [x] Light theme adaptive styling for Hero image card.

### 5. Resume Management
- [x] Admin PDF upload, preview, download, and remove actions in `/admin/profile` -> Resume Tab.
- [x] Public Navbar and Hero section render "View Resume" (in browser) and "Download Resume" buttons.
- [x] Gracefully hide resume buttons when no resume URL is configured.

---

## Phase 6: Continuation Task — CMS Completion, Admin Security, Navigation & Branding — COMPLETED

### 1. Remove Remaining Hardcoded Content & Connect to CMS
- [x] `03. CAREER_TRAJECTORY`: Added `GET /api/experience` public API, built dedicated Admin Experience CMS at `/admin/experience` (full CRUD, bilingual fields, active role toggle, tech stack), updated `ExperienceSection.tsx` with dynamic CMS data or bilingual "Coming Soon" empty state.
- [x] `04. ACADEMICS_AND_CERTS`: Added `GET /api/education` and `GET /api/certifications` public APIs, added `updateEducation` & `updateCertification` controllers/PUT routes, built dedicated Admin Academics CMS at `/admin/education` (full CRUD), updated `EducationSection.tsx` with dynamic CMS degrees/certs or bilingual empty state.
- [x] `Contact & Social`: Connected `ContactSection.tsx` to CMS Profile data (`profile?.email`, `profile?.socialLinks?.github`, `profile?.socialLinks?.linkedin`, `profile?.location`, `profile?.availabilityText`), passed profile to ContactSection in `src/app/[locale]/page.tsx`.
- [x] Critical restriction honored: Skills page (`SkillsSection.tsx`) preserved 100% untouched.

### 2. Secure Admin Panel and Fix Footer Admin Link
- [x] Clicking footer Admin link navigates directly to `/admin/login`, requiring authentication before entering the panel.
- [x] Protected admin routes redirect unauthenticated users to `/admin/login?redirect=...`.
- [x] Removed automatic bounce away from login page so visiting `/admin/login` always renders the login form.
- [x] Post-login redirect navigates users to their intended destination page.
- [x] Backend independently validates JWT token, session `tokenVersion`, and returns 401 for unauthenticated/expired requests.

### 3. Remove Production Placeholder Banner
- [x] Removed top `[PROD-READY ARCHITECTURE]` notice banner from `src/app/[locale]/layout.tsx`.
- [x] Verified zero residual banner markup across all public routes.

### 4. Fix Navigation from Project Detail Pages & Nested Routes
- [x] Section navigation links in `Navbar` (desktop & mobile drawer) and `Footer` detect current route via `usePathname`.
- [x] When viewing project detail pages or nested routes, clicking About, Skills, Projects, Experience, Blog, or Contact navigates to `/${locale}#${id}`.
- [x] Added hash scroll listener in `Navbar` to ensure smooth scrolling after route transition.
- [x] Added `scroll-padding-top: 5rem;` in `src/app/globals.css` so section titles are never hidden behind the sticky navbar.

### 5. Replace Default Next.js Browser Favicon
- [x] Removed default Next.js `src/app/favicon.ico`.
- [x] Created custom developer SVG brand mark icon at `src/app/icon.svg` and `public/icon.svg` featuring dark terminal rounded base, emerald/cyan gradient border, and glowing `<M/>` code monogram.
- [x] Configured icon metadata in `src/app/layout.tsx` for cross-browser and bilingual route support.

### 6. Make Assistant Content Admin-Managed
- [x] Public `FloatingAssistant.tsx` dynamically loads live Q&A pairs from `publicApi.getAssistantQA()`.
- [x] Clicking any predefined question displays its saved bilingual answer.
- [x] Free-form queries match against saved CMS Q&A corpus with bilingual fallback.
- [x] Shows graceful empty state when no predefined questions are active in the database.
- [x] Full management in Admin `/admin/assistant` verified working.

### 7. Verification & Safety Audits
- [x] `npm --prefix backend run typecheck` (0 errors).
- [x] `npm --prefix backend test` (10/10 tests passed).
- [x] `npm run lint` (0 errors, 0 warnings).
- [x] `npx tsc --noEmit` (0 errors).
- [x] `npm run build` (26/26 routes compiled cleanly).
- [x] End-to-end integration test suite passed (auth, session, CRUD, public API).
- [x] `git diff --check` passed.
- [x] No secrets in Git; no database reset performed.
