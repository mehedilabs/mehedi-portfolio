# PROGRESS.md — Project Status & Live Execution Log

## Current Phase
- **Phase**: Phase 1 — Project Foundation & Public Portfolio (Prompt 1 of 4)
- **Status**: COMPLETED & VERIFIED (Hotfix Applied: Tailwind CSS v4 Rendering Pipeline)
- **Current Task**: Phase 1 foundation complete and verified; styling actively rendering across all pages. Awaiting Prompt 2 to begin Phase 2.

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
