<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Architecture, Conventions & Development Guidelines

This document governs architecture, coding standards, security, and Git operations for the **Mehedi Hasan Portfolio** project. Any AI agent or developer continuing this project must follow these guidelines.

---

## 1. System Architecture

The repository is structured as a unified monorepo containing a modern Next.js frontend at the root and an Express REST API in `backend/`. Both parts are independently deployable:
- **Frontend**: Next.js App Router (TypeScript, Tailwind CSS, shadcn/ui design patterns, Lucide icons). Hosted on platforms like Vercel or Node runtime.
- **Backend**: Express.js + TypeScript in `backend/`. Connects to MongoDB Atlas for persistent storage, with Cloudinary for image and asset management. Hosted on Render, Railway, VPS, or similar platforms.

### Directory Structure Overview
```
mehedi-portfolio/
├── AGENTS.md                # Project guidelines, conventions, rules (this file)
├── PROGRESS.md              # Live status, completed work, verification, next actions
├── TASKS.md                 # Master feature checklist with status indicators
├── .env.example             # Frontend environment documentation
├── .gitignore               # Strict ignore rules (secrets, builds, node_modules)
├── package.json             # Frontend dependencies & scripts
├── tsconfig.json            # Frontend TypeScript configuration
├── next.config.ts           # Next.js configuration
├── public/                  # Static assets (images, icons, resume placeholder)
├── src/
│   ├── app/                 # Next.js App Router routes
│   │   ├── [locale]/        # Localized public routes (/en, /bn)
│   │   │   ├── page.tsx     # Homepage (all sections)
│   │   │   ├── layout.tsx   # Localized root layout (header, footer, assistant)
│   │   │   ├── projects/    # Project detail pages (planned)
│   │   │   └── blog/        # Blog detail pages (planned)
│   │   ├── layout.tsx       # Root html/body layout & font definitions
│   │   ├── page.tsx         # Root redirect to default locale (/en)
│   │   └── globals.css      # Dark developer theme styling & Tailwind v4
│   ├── components/          # Reusable frontend UI components
│   │   ├── ui/              # shadcn-inspired primitives (Button, Card, Badge, etc.)
│   │   ├── layout/          # Header, Navigation, Footer, LanguageSwitcher
│   │   ├── sections/        # Hero, About, Skills, Experience, Education, Projects, Blog, Contact
│   │   └── assistant/       # Floating profile-photo chat assistant
│   ├── data/                # Structured static & fallback data (bilingual)
│   │   └── content.ts       # English & Bangla content records
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions (cn, i18n helpers)
│   └── types/               # TypeScript interfaces & types
└── backend/
    ├── .env.example         # Backend environment documentation
    ├── package.json         # Backend Express dependencies
    ├── tsconfig.json        # Backend TypeScript configuration
    └── src/
        ├── config/          # Database connection, env loader
        ├── controllers/     # API request handlers
        ├── middleware/      # Auth, validation, error handler
        ├── models/          # MongoDB Mongoose schemas (bilingual structure)
        ├── routes/          # Express route definitions
        ├── types/           # Backend TypeScript types
        └── index.ts         # Express app entry point
```

---

## 2. Bilingual Architecture (English & Bangla)

1. **Routing**: Public routes are prefixed by locale: `/en` and `/bn`. Root `/` redirects or matches locale preference.
2. **Entity Architecture**: Do NOT duplicate database entities or records per locale. A single record (e.g. `Project`, `Post`, `Skill`, `Experience`) contains bilingual sub-documents:
   ```ts
   interface LocalizedContent {
     title: string;
     slug?: string;
     description: string;
     content?: string;
     seoTitle?: string;
     seoDescription?: string;
   }
   interface Project {
     _id: string;
     featured: boolean;
     githubUrl?: string;
     liveUrl?: string;
     techStack: string[];
     thumbnail: string;
     en: LocalizedContent;
     bn: LocalizedContent;
     createdAt: Date;
   }
   ```
3. **Typography**: Bangla requires adequate line-height (`leading-relaxed` or `leading-loose`) and compatible font fallbacks (system fonts, `Hind Siliguri`, `Noto Sans Bengali`). Diacritics must never be visually clipped.
4. **Fallback Policy**: If a translation is missing or incomplete, fall back explicitly to English (`en`) and log or indicate fallback status cleanly. Never show empty/blank text nodes.
5. **Language Switcher**: Must preserve the current page path and hash/scroll position when switching between `/en` and `/bn`.
6. **SEO & Hreflang**: All public pages must render `<link rel="alternate" hreflang="en" ...>`, `<link rel="alternate" hreflang="bn" ...>`, and `x-default`.

---

## 3. UI/UX Design Direction

- **Developer Aesthetic**: Dark terminal-inspired theme with rich deep tones (`#0a0d14`, `#0f172a`), emerald/cyan terminal accents (`#10b981`, `#06b6d4`), subtle glowing border effects, monospaced accents, and clean modern typography.
- **Responsiveness**: Mobile-first, fully tested down to 360px viewport width without horizontal scrollbars.
- **Accessibility**: Semantic HTML5 elements (`main`, `section`, `nav`, `header`, `footer`, `article`), appropriate ARIA labels on buttons and interactive elements, keyboard navigability, high color contrast ratios.
- **States**: Every interactive component must have hover, active, focus-visible, and disabled states. Asynchronous areas must support polished loading skeletons, empty states, and friendly error states.

---

## 4. Coding & Security Rules

1. **Strict TypeScript**: Enable `strict: true` across all tsconfigs. Avoid `any`; use well-defined interfaces and generic types.
2. **No Plaintext Secrets**: NEVER commit API keys, database credentials, passwords, or JWT secrets to Git or write them in markdown files. Use `.env.local` (frontend) and `backend/.env` (backend).
3. **Sanitization & Validation**: All incoming requests to the backend must be validated and sanitized. In the frontend, escape inputs and prevent XSS.
4. **Preserve User Code**: Never overwrite unrelated user files or delete files blindly.
5. **Backend Isolation**: Run the backend in its own directory `backend/` with its own `package.json` and `tsconfig.json`.

---

## 5. Git & Delivery Rules

1. **Commit Cadence**: Commit after every meaningful, verified feature or architectural step.
2. **Commit Messages**: Write clear, imperative commit messages (e.g., `feat(ui): implement bilingual responsive hero and navbar`).
3. **Safe Push**: Always verify the current branch and remote before pushing. Never force push to shared branches or rewrite public history.
4. **Sync Documentation**: Keep `PROGRESS.md` and `TASKS.md` updated with the actual state after each milestone.
