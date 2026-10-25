# PROGRESS.md — Project Status & Live Execution Log

## Current Phase
- **Phase**: Phase 1 — Project Foundation & Public Portfolio (Prompt 1 of 4)
- **Status**: COMPLETED & VERIFIED (Milestone: Functional Video Playback Controls)
- **Current Task**: Added fully functional Play/Pause, Seek bar, Volume slider with Mute toggle, and Time display to the video showcase.

---

## Milestone: Functional Video Playback Controls

### Implemented Enhancements
1. **Play/Pause Control**:
   - Interactive button toggling between `Play` and `Pause` states.
   - Synchronized with `<video>` `onPlay` and `onPause` events.
   - Center ripple Play overlay appears when paused for clear visual feedback and quick resume.
   - Clicking directly on the video body toggles playback.
2. **Interactive Seek Bar**:
   - Functional range slider showing current playback progress with dynamic emerald gradient track fill.
   - Users can drag or click anywhere on the seek bar to scrub forward and backward in real time.
   - Prevents scroll bubbling and maintains smooth interaction during all scroll states.
3. **Volume & Mute Control**:
   - Dynamic volume button with 3 states (`Volume2`, `Volume1`, `VolumeX`).
   - Clicking toggles mute/unmute while restoring the previous volume level.
   - Continuous volume slider allowing users to adjust volume from 0% to 100% with live gradient track fill.
4. **Time Display**:
   - Formatted `mm:ss / mm:ss` tabular-numeric readout showing live `currentTime` and total `duration`.
5. **Aesthetics & Layout Preservation**:
   - Integrated into a sleek bottom control bar with subtle backdrop gradient (`from-black/95 via-black/70 to-transparent`).
   - Does not obscure the subject, does not alter laptop screen aspect ratio or 3D scroll animation, and remains completely accessible whether the video is resting inside the laptop or floating in zoomed state.
6. **Verification Outcomes**:
   - `npm run lint`: **0 errors, 0 warnings** (clean code 0).
   - `npm run build`: **20/20 static pages generated cleanly** (clean code 0).
   - `npm --prefix backend run build`: Backend TypeScript compiles cleanly (clean code 0).

---

## Milestone: Laptop Video Showcase 3 Bugs Fix (Screen Fit, Heading Separation & Seamless Exit Transition)

### Implemented Fixes & Enhancements
1. **Bug 1 Fixed — Heading & Section Overlap Eliminated**:
   - Rescaled heading to clean, balanced proportions (`text-2xl sm:text-4xl md:text-5xl font-extrabold`) with generous vertical spacing (`mb-5 sm:mb-8`).
   - Re-architected 3D laptop perspective geometry: laptop screen lid sits upright while keyboard chassis base tilts in perspective (`rotateX(55deg) origin-top`), dramatically reducing the vertical footprint from over 620px to ~420px.
   - Ensured ample breathing room (~67px - 130px) between top navbar, heading, and laptop lid across desktop, tablet, and mobile, completely eliminating overlap.
2. **Bug 2 Fixed — Video Fits Inside Laptop Screen Realistically**:
   - Relocated animated video overlay to be anchored directly over the inner screen display well: `top-[22px] sm:top-[28px] left-[6px] sm:left-[8px] right-[6px] sm:right-[8px] bottom-[6px] sm:bottom-[8px]`.
   - In State 1 (`progress = 0`), the video matches the inner screen bezel geometry with 0px offset, completely eliminating the black gap at the bottom of the screen.
   - When lifting off, the video elevates in Z (`translateZ` from 0 to 140px), scales smoothly (`1.0` to `1.36`), tilts forward at mid-point (`rotateX` up to 16deg), and levels flat (`rotateX: 0deg`) in front of the keyboard.
   - Behind the lifted video, the recessed matte screen well cleanly displays Mehedi Hasan's branding.
3. **Bug 3 Fixed — Seamless Transition to Section Below (BlogSection)**:
   - Moderated State 3 vertical positioning (`translateY: 34px`) so the scaled video stays comfortably centered within the viewport with over 160px of clearance from the bottom edge.
   - Removed native video controls (`controls={isFinalState}`) that intercepted mouse wheel/touch scroll and covered the bottom; video loops smoothly with sleek custom audio toggle (`Volume2`/`VolumeX`).
   - Updated `BlogSection` and `ProjectsSection` with solid, opaque backgrounds (`bg-[#080b12]` and `bg-[#050811]`) and explicit `z-20` stacking context so scrolling down flows seamlessly into the following content.
4. **Verification Outcomes**:
   - `npm run lint`: **0 errors, 0 warnings** (clean code 0).
   - `npm run build`: **20/20 static pages generated cleanly** (clean code 0).
   - `npm --prefix backend run build`: Backend TypeScript compiles cleanly (clean code 0).

---

## Milestone: Scroll-Driven Video Showcase (MacBook Presentation)

### Implemented Enhancements
1. **Three-State Scroll Animation Architecture**:
   - **Screenshot 1 (Initial State, progress = 0)**:
     - Heading "Full-Stack Development Solutions" (bilingual) prominent at top.
     - 3D perspective MacBook laptop with dark chassis, recessed keyboard, backlit keys, and trackpad.
     - Video sits flush inside the laptop screen lid (`scale: 1.0`, `rotateX: -8deg`, `translateY: 0px`).
   - **Screenshot 2 (Intermediate State, progress = 0.5)**:
     - Heading fades and scrolls upward.
     - The single video element lifts forward out of the laptop screen, scaling up (`scale: 1.28`), translating downward (`translateY: 60px`), and tilting in 3D perspective (`rotateX: +22deg`) with rounded corners.
     - Laptop lid back is revealed with "Mehedi Hasan" branding at the top bezel.
   - **Screenshot 3 (Final State, progress = 1.0)**:
     - The video expands to full foreground presentation size (`scale: 1.62` on desktop, `translateY: 135px`, `rotateX: 0deg`), perfectly flat and perpendicular to the camera.
     - Settles directly in front of the laptop keyboard with deep ambient drop shadows.
     - Full video playback controls become active with interactive play/pause, time, volume, and fullscreen.
2. **Strict Single Video Presentation**:
   - Exactly ONE `<video>` element in the entire section. No cloned cards or simulated video swaps.
   - Responsive and fluid transform interpolation using lightweight `requestAnimationFrame` on scroll.
3. **Local Creative Commons Demo Video Asset**:
   - Added temporary demo video `public/videos/demo-showcase.mp4` (~1.1 MB, reliable CC0 MP4).
   - Starts autoplaying muted (browser-compliant) with a floating quick-toggle sound button and native controls upon settling.
   - Isolated and easy to replace in Phase 2 with production Cloudinary assets.
4. **MacBook Component & Responsive Usability**:
   - Built `src/components/ui/MacbookKeyboard.tsx` with function row, number keys, QWERTY, space bar, and inverted-T arrow keys.
   - Fully responsive down to 360px mobile viewports without horizontal overflow.
   - Full accessibility support: respects `prefers-reduced-motion` via `React.useSyncExternalStore` (instantly renders final readable state without forcing scroll).
5. **Verification Outcomes**:
   - `npm run lint`: **0 errors, 0 warnings** (exited code 0).
   - `npm run build`: **20/20 static pages generated in 810ms** (exited code 0).
   - `npm --prefix backend run build`: Backend TypeScript compiles cleanly (exited code 0).

---

## Milestone: Simplified, Visual, Professional Projects Experience

### Implemented Enhancements
1. **Homepage Projects Section**:
   - Displays exactly 4 featured project cards (`PROJECTS_DATA.filter(p => p.featured).slice(0, 4)`).
   - Clean, simple heading "Featured Projects" (with bilingual support) and an intuitive "View All Projects" action link.
   - Removed all unnecessary category counters, statistics ("All Systems", "Full-Stack Web", "APIs & Services", "Cloud & DevOps"), and confusing decorative tags.
   - Clean responsive layout: 3 compact cards per row on desktop (4th card wraps naturally to the next row), 2 columns on tablet, and 1 column on mobile.
   - Removed heavy case study quick modals from the homepage in favor of clean navigation to individual detail pages.

2. **Unified 16:9 Visual `ProjectCard` Component**:
   - Created `src/components/ui/ProjectCard.tsx` with a prominent 16:9 aspect ratio (`aspect-video`) screenshot/image area.
   - Built a sleek terminal window header bar showing the live/demo domain and 3 colored window dots.
   - Implemented real screenshot image rendering with automatic fallback to an elegant developer placeholder with category badge and icon.
   - Compact content body: 1-line project title, concise 1–2 line description, 3–4 clean technology tags, and clear "Details", "Live Demo", and "Source Code" action links.
   - Reused across both the Homepage and the View All Projects page for 100% visual consistency.

3. **View All Projects Page (`/[locale]/projects`)**:
   - Clean dedicated page displaying ALL available real projects in the same compact 3-column desktop grid.
   - Removed cluttered category tabs, item counters, and complex dashboard decorations.
   - Preserves breadcrumb navigation (`Home / Projects`), "Back to Home" button, and native browser Back button history.

4. **Clean, Plain-English Project Details Pages (`/[locale]/projects/[slug]`)**:
   - Consistent layout across all projects:
     - Header with project name, concise tagline, category, and Live Demo/Source Code action buttons.
     - Large, attractive 16:9 preview mockup window with real screenshot / placeholder canvas.
     - Clear plain-English "Project Overview".
     - "Key Features" presented as readable bullet points with checkmark icons.
     - "Technology Stack" section showing verified tools and concise architecture description.
     - "Challenge & Solution" comparative cards written without excessive technical jargon.
     - Previous / Next project pagination links and "Back to Projects" return action.

5. **Verification Outcomes**:
   - `npm run lint`: **0 errors, 0 warnings** (exited code 0).
   - `npm run build`: **20/20 static pages generated in 870ms** (exited code 0).
   - `npm --prefix backend run build`: Backend TypeScript compiles cleanly (exited code 0).
   - Verified both `/en` and `/bn` routes and all project detail pages (`/[locale]/projects/[slug]`).

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
