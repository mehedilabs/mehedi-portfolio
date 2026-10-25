import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Network,
  Sparkles,
  Layers,
  Shield,
  Zap,
  ArrowRight,
  Home,
  Compass,
  GitBranch,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { PROJECTS_DATA } from "@/data/portfolio-data";
import { Locale } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["en", "bn"]) {
    for (const project of PROJECTS_DATA) {
      const slug = locale === "bn" ? project.bn.slug : project.en.slug;
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const project = PROJECTS_DATA.find(
    (p) => p.en.slug === slug || p.bn.slug === slug
  );

  if (!project) return { title: "Project Not Found" };

  const content = locale === "bn" ? project.bn : project.en;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    title: `${content.title} | Systems Architecture`,
    description: content.tagline,
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/${content.slug}`,
      languages: {
        en: `${baseUrl}/en/projects/${project.en.slug}`,
        bn: `${baseUrl}/bn/projects/${project.bn.slug}`,
      },
    },
    openGraph: {
      title: `${content.title} — System Architecture Case Study`,
      description: content.tagline,
      url: `${baseUrl}/${locale}/projects/${content.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dict = dictionaries[locale];

  const projectIndex = PROJECTS_DATA.findIndex(
    (p) => p.en.slug === slug || p.bn.slug === slug
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS_DATA[projectIndex];
  const content = locale === "bn" ? project.bn : project.en;
  const study = content.caseStudy;

  const prevProject = projectIndex > 0 ? PROJECTS_DATA[projectIndex - 1] : null;
  const nextProject =
    projectIndex < PROJECTS_DATA.length - 1
      ? PROJECTS_DATA[projectIndex + 1]
      : null;

  return (
    <article className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{dict.projects.backToProjects}</span>
          </Link>

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <Link href={`/${locale}`} className="flex items-center gap-1 hover:text-slate-300 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <Link href={`/${locale}/projects`} className="hover:text-slate-300 transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-emerald-400 font-medium truncate max-w-[200px]">
              {content.title}
            </span>
          </nav>
        </div>

        {/* Project Header Banner */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="terminal" className="text-xs">
              System Architecture
            </Badge>
            <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {project.category}
            </span>
            {content.metrics && (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{content.metrics}</span>
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {content.title}
          </h1>

          <p className="text-lg sm:text-xl font-mono text-emerald-400">
            {content.tagline}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="tech" className="text-xs py-1 px-3">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button size="default" variant="default" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>{dict.projects.viewLive}</span>
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button size="default" variant="terminal" className="gap-2">
                  <GithubIcon className="w-4 h-4" />
                  <span>{dict.projects.viewCode}</span>
                </Button>
              </a>
            )}
            <Link href={`/${locale}#contact`}>
              <Button size="default" variant="outline" className="gap-2 text-slate-300">
                <span>Discuss System Design</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Large Project Preview Mockup Window (Mihir Das Inspired) */}
        <div className="rounded-2xl border border-slate-800 bg-[#090d16] shadow-2xl overflow-hidden font-mono">
          {/* Mockup Window Title Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-300 text-[11px] sm:text-xs">
              <span className="text-emerald-400">https://</span>
              <span>{content.slug}.mehedi.dev</span>
            </div>

            <div className="text-[11px] text-slate-500 uppercase tracking-wider hidden sm:block">
              {project.category} / prod-v1.0
            </div>
          </div>

          {/* Preview Window Graphic Canvas */}
          <div className="relative p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#0c121e] via-[#090d16] to-[#070a10] overflow-hidden">
            <div className="absolute inset-0 terminal-grid opacity-40 pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6 text-center">
              <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border-2 border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.25)] mx-auto">
                <Network className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-3xl font-extrabold text-white font-mono">
                  {content.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl mx-auto">
                  {content.tagline}
                </p>
              </div>

              {/* System Architecture Highlights Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-left">
                  <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Architecture</p>
                  <p className="text-xs font-mono font-bold text-white mt-1">Decoupled Monorepo</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-left">
                  <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Type Safety</p>
                  <p className="text-xs font-mono font-bold text-emerald-400 mt-1">End-to-End Strict TS</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-left">
                  <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Deployment</p>
                  <p className="text-xs font-mono font-bold text-cyan-400 mt-1">Docker & Cloud Native</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Case Study Content Blocks */}
        <div className="space-y-12">
          {/* Section 1: Executive Summary */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
              <span>Executive Overview</span>
            </h2>
            <div className="rounded-2xl border border-slate-800 bg-[#0c101a] p-6 sm:p-8 lg:p-10 space-y-4 text-slate-300 text-base sm:text-lg lg:text-[17.5px] leading-[1.75]">
              <p>{content.description}</p>
              {study && <p>{study.overview}</p>}
            </div>
          </div>

          {/* Section 2: Key Architecture Highlights */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>{dict.projects.keyFeatures}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-[#0c111a] p-5 sm:p-6 flex items-start gap-3.5"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Engineering Challenge & Solution Comparison */}
          {study && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span>The Engineering Challenge & Technical Solution</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Challenge */}
                <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 sm:p-8 space-y-3">
                  <div className="inline-flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider font-semibold">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>{dict.caseStudy.challenge}</span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-[16.5px] text-slate-300 leading-[1.7]">
                    {study.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 sm:p-8 space-y-3">
                  <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{dict.caseStudy.solution}</span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-[16.5px] text-slate-300 leading-[1.7]">
                    {study.solution}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: System Architecture & Data Flow */}
          {study && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2.5">
                <Network className="w-5 h-5 text-cyan-400" />
                <span>{dict.caseStudy.architecture}</span>
              </h2>

              <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 space-y-4">
                <div className="font-mono text-xs sm:text-sm text-emerald-400 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-500">{"// Production Data Flow Pipeline"}</span>
                  <p className="text-slate-200 mt-1 leading-relaxed">{study.architecture}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                  <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px]">Tier 1</span>
                    <p className="font-bold text-slate-200">Next.js App Router</p>
                    <p className="text-slate-400 text-[11px]">Bilingual SSR & Static Prerender</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px]">Tier 2</span>
                    <p className="font-bold text-emerald-400">Express REST Gateway</p>
                    <p className="text-slate-400 text-[11px]">JWT Auth, Rate Limiter, CORS</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px]">Tier 3</span>
                    <p className="font-bold text-cyan-400">MongoDB Atlas Cluster</p>
                    <p className="text-slate-400 text-[11px]">Bilingual Sub-Docs & Indexing</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Measurable Impact & Metrics */}
          {study && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>{dict.caseStudy.results}</span>
              </h2>

              <div className="rounded-2xl border border-slate-800 bg-[#0c101a] p-6 sm:p-8 space-y-3">
                <ul className="space-y-3 font-sans">
                  {study.results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base sm:text-lg text-slate-300">
                      <span className="text-emerald-400 font-bold text-lg leading-none mt-0.5">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Section 6: Future Roadmap & Enhancements */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-emerald-400" />
              <span>{dict.caseStudy.roadmapTitle}</span>
            </h2>

            <div className="rounded-2xl border border-slate-800 bg-[#0c101a] p-6 sm:p-8 space-y-3 font-mono text-xs sm:text-sm text-slate-300">
              <p className="text-slate-400 font-sans text-sm sm:text-base leading-relaxed mb-4">
                {locale === "bn"
                  ? "সিস্টেমটির ভবিষ্যৎ ফেজে নিম্নলিখিত প্রযুক্তিগত সক্ষমতা যুক্ত করার জন্য আর্কিটেকচার প্রস্তুত করা হয়েছে:"
                  : "The system design incorporates modular extension hooks for upcoming production enhancements:"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex items-start gap-2.5">
                  <GitBranch className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {locale === "bn"
                      ? "ক্লাউডিনারি মিডিয়া ইন্টিগ্রেশন ও সরাসরি সিডিএন ক্যাশিং"
                      : "Cloudinary asset pipeline & dynamic WebP/AVIF generation"}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex items-start gap-2.5">
                  <GitBranch className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {locale === "bn"
                      ? "এডমিন সিএমএস-এর মাধ্যমে রিয়েল-টাইম মেট্রিক্স কনফিগারেশন"
                      : "Administrative CMS dynamic configuration & telemetry API"}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex items-start gap-2.5">
                  <GitBranch className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {locale === "bn"
                      ? "মাল্টি-রিজিওন ডেটাবেজ রেপ্লিকেশন ও লেটেন্সি হ্রাস"
                      : "Multi-region MongoDB read replication & edge routing"}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex items-start gap-2.5">
                  <GitBranch className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {locale === "bn"
                      ? "AI অ্যাসিস্ট্যান্ট ডোমেন-নলেজ গ্রাফ ইন্টিগ্রেশন"
                      : "AI assistant domain knowledge retrieval & embeddings"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination Links (Prev / Next Project) */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          {prevProject ? (
            <Link
              href={`/${locale}/projects/${locale === "bn" ? prevProject.bn.slug : prevProject.en.slug}`}
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                Previous: {locale === "bn" ? prevProject.bn.title : prevProject.en.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href={`/${locale}/projects`}
            className="px-4 py-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            {dict.projects.backToProjects}
          </Link>

          {nextProject ? (
            <Link
              href={`/${locale}/projects/${locale === "bn" ? nextProject.bn.slug : nextProject.en.slug}`}
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <span>
                Next: {locale === "bn" ? nextProject.bn.title : nextProject.en.title}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}
