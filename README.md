# Mehedi Hasan — Portfolio & Architecture Showcase

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express-REST_API-000000?logo=express)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas_Mongoose-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

A high-performance, bilingual (English & Bangla) developer portfolio and monorepo CMS engineered with Next.js 16 App Router, Tailwind CSS, TypeScript, and a decoupled Express.js REST API with MongoDB Atlas persistence.

Designed with a dark terminal aesthetic (`#0a0d14`), emerald/cyan cyber accents, interactive laptop video showcase, floating Q&A assistant, and complete dynamic section management via an authenticated Admin Panel.

---

## Architecture Overview

```
mehedi-portfolio/
├── AGENTS.md                   # System architecture & developer guidelines
├── PROGRESS.md                 # Real-time implementation status & test logs
├── TASKS.md                    # Master task & milestone checklist
├── .env.example                # Documented frontend environment template
├── package.json                # Frontend root dependencies & build scripts
├── next.config.ts              # Next.js configuration & image domains
├── public/                     # Static assets (favicons, screenshots, illustrations)
├── src/
│   ├── app/                    # Next.js 16 App Router
│   │   ├── [locale]/           # Bilingual routing (/en & /bn)
│   │   │   ├── page.tsx        # Dynamic public homepage
│   │   │   ├── layout.tsx      # Localized root layout (nav, footer, assistant)
│   │   │   ├── projects/       # Projects list & [slug] case studies
│   │   │   └── blog/           # [slug] blog post reader
│   │   ├── admin/              # Protected Admin CMS dashboard & modules
│   │   │   ├── layout.tsx      # Route guard (token + session verification)
│   │   │   ├── login/          # Secure admin authentication
│   │   │   ├── sections/       # Drag-and-drop / toggle section visibility
│   │   │   ├── video/          # Showcase settings (Google Drive / native)
│   │   │   ├── projects/       # Project CMS management
│   │   │   ├── skills/         # Skills & categories CMS
│   │   │   ├── messages/       # Contact inbox & message viewer
│   │   │   ├── assistant/      # Floating assistant Q&A training
│   │   │   └── settings/       # Account password & security configuration
│   │   ├── robots.ts           # Dynamic robots.txt generator
│   │   ├── sitemap.ts          # Bilingual XML sitemap generator with hreflang
│   │   └── globals.css         # Dark theme styling & terminal glow effects
│   ├── components/             # Modular React components
│   │   ├── ui/                 # Accessible primitives (Button, Card, Badge, etc.)
│   │   ├── layout/             # Header, Navigation, Footer, LanguageSwitcher
│   │   ├── sections/           # Hero, About, Skills, Experience, Education, Projects, Blog, Contact
│   │   └── assistant/          # Floating profile-photo chat assistant
│   ├── data/                   # Fallback bilingual data records
│   ├── lib/                    # API client with dual-auth, utils, and formatters
│   └── types/                  # Strict TypeScript domain interfaces
└── backend/                    # Decoupled Express.js REST API
    ├── .env.example            # Documented backend environment template
    ├── package.json            # Backend dependencies & test scripts
    ├── tsconfig.json           # Backend TypeScript configuration
    └── src/
        ├── config/             # MongoDB connection pooling & env loader
        ├── controllers/        # Request handlers (auth, CMS, settings, media)
        ├── middleware/         # JWT verification, CORS, rate limiting, error handler
        ├── models/             # Mongoose schemas (bilingual sub-document pattern)
        ├── routes/             # Express API routes
        └── index.ts            # API server entrypoint & port listener
```

---

## Key Features

1. **Zero-Entity-Duplication Localization**:
   - Single MongoDB documents hold localized sub-documents (`en` and `bn`).
   - Clean route prefixing (`/en` and `/bn`) with automatic fallbacks and SEO-ready alternate hreflang tags.
2. **Laptop Video Showcase**:
   - Responsive laptop chassis with dynamic playback controls.
   - Dual-mode support: Embedded responsive Google Drive player and native HTML5 video with seeking and duration calculation.
3. **Admin CMS & Dynamic Section Management**:
   - Protected Admin Panel (`/admin`) guarded by JWT tokens (persisted in `localStorage` & HTTP-only cookies).
   - Real-time toggling of public sections (Hero, About, Skills, Experience, Projects, Video Showcase, Blog, Contact). Disabled sections leave zero blank space, and their navbar links are automatically removed.
4. **Interactive Floating Assistant**:
   - Pre-trained FAQ assistant matching Mehedi's architectural style, consulting availability, and tech stack.
5. **Decoupled Express REST API**:
   - Independent backend with MongoDB Atlas connection pooling, Cloudinary image management, BCrypt password hashing, and rate limiting.

---

## Environment Variables & Configuration

### 1. Frontend Configuration (`.env.local`)

Create `.env.local` in the project root:

```env
# Base URL for public site and canonical tags
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Absolute URL to the Express REST API
NEXT_PUBLIC_API_URL="http://localhost:5000/api"

# Default locale fallback ('en' or 'bn')
NEXT_PUBLIC_DEFAULT_LOCALE="en"

# Site brand title for SEO metadata
NEXT_PUBLIC_SITE_NAME="Mehedi Hasan — Senior Full-Stack Architect"
```

### 2. Backend Configuration (`backend/.env`)

Create `backend/.env`:

```env
# Server Port & Runtime Environment
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/mehedi_portfolio?retryWrites=true&w=majority"

# Allowed CORS Origin (Frontend URL)
CORS_ORIGIN="http://localhost:3000"

# JWT Secret (Generate with: openssl rand -base64 48)
JWT_SECRET="your_secure_random_jwt_secret_min_32_characters"
JWT_EXPIRES_IN="7d"

# One-time Initial Admin Seeding (auto-created on first run if database is empty)
ADMIN_INITIAL_EMAIL="admin@mehedi.dev"
ADMIN_INITIAL_PASSWORD="SecurePassword2026!"

# Optional: Cloudinary Remote Storage for Media Uploads
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

> **Security Note:** Never commit `.env` or `.env.local` to Git. Both files are strictly ignored in `.gitignore`.

---

## Local Development Walkthrough

### Prerequisites
- **Node.js**: v18.18+ or v20+
- **npm**: v9+ (or pnpm / yarn)
- **MongoDB**: MongoDB Atlas URI or local MongoDB instance

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/mehedilabs/mehedi-portfolio.git
cd mehedi-portfolio

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment Files

```bash
# Copy frontend example
cp .env.example .env.local

# Copy backend example
cp backend/.env.example backend/.env
```
*(Populate your MongoDB Atlas URI and JWT secret in `backend/.env`)*

### 3. Run Development Servers

Open two terminal sessions:

**Terminal 1 — Backend API:**
```bash
cd backend
npm run dev
# Server starts at http://localhost:5000/api
```

**Terminal 2 — Frontend Application:**
```bash
npm run dev
# Public site available at http://localhost:3000
```

---

## Verification & Testing Suite

All code must pass static type analysis, linting, unit tests, and production compilation before deployment.

```bash
# 1. Frontend ESLint
npm run lint

# 2. Backend TypeScript typecheck
npm --prefix backend run typecheck

# 3. Backend Unit & Integration Tests (Vitest)
npm --prefix backend test

# 4. Backend Production Build
npm --prefix backend run build

# 5. Frontend Next.js Production Build
npm run build
```

---

## Admin Panel Setup & CMS Usage

1. **Accessing the Dashboard**:
   - Navigate to `http://localhost:3000/admin` or click the shield icon in the footer.
   - If unauthenticated, the application automatically redirects to `/admin/login`.
2. **First-Time Setup**:
   - If no admin exists in the database, you can log in with the credentials defined in `ADMIN_INITIAL_EMAIL` and `ADMIN_INITIAL_PASSWORD`, or perform the initial setup form.
3. **Managing Sections**:
   - Visit `/admin/sections` to toggle section visibility or reorder sections. Changes take immediate effect on the public homepage `/en` and `/bn`.
4. **Updating Video Showcase**:
   - Visit `/admin/video` to update the showcase headline, sub-headline, and video URL. Supports Google Drive shareable links (automatically converted to embedded preview players) or native MP4 URLs.

---

## Production Deployment Guide

### Deploying Frontend (Vercel)
1. Push your repository to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Root Directory to `./` (root).
4. Configure Environment Variables in Vercel:
   - `NEXT_PUBLIC_APP_URL`: `https://your-domain.com`
   - `NEXT_PUBLIC_API_URL`: `https://your-api-domain.com/api`
   - `NEXT_PUBLIC_DEFAULT_LOCALE`: `en`
5. Deploy.

### Deploying Backend (Render / Railway / VPS)
1. In your hosting platform, create a new Web Service pointing to the repository.
2. Set the Root Directory to `backend`.
3. Set Build Command: `npm install && npm run build`
4. Set Start Command: `npm start`
5. Configure Environment Variables in the platform dashboard:
   - `PORT`: `5000` (or assigned platform port)
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas production cluster connection string
   - `CORS_ORIGIN`: `https://your-domain.com`
   - `JWT_SECRET`: A secure 64-character string
   - `CLOUDINARY_*`: Your Cloudinary credentials
6. Deploy.

---

## Security Best Practices

- **Zero Secret Leakage**: No API keys, database connection strings, or JWT secrets are stored in version control.
- **Dual-Token Authentication**: Admin API calls transmit credentials both via secure cookies and Bearer tokens to prevent cross-origin issues.
- **Route Protection**: The Admin route layout strictly validates tokens before rendering protected UI.
- **Input Sanitization**: Express middleware checks and sanitizes contact form submissions and query parameters.
- **Rate Limiting**: Critical endpoints (login, contact submissions) are rate-limited to mitigate brute-force and DDoS attacks.

---

## License

MIT © [Mehedi Hasan](https://github.com/mehedilabs)
