/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Home,
  Globe,
  Layers,
  Code2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { Locale, ProjectItem } from "@/types";
import { publicApi } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  let project: ProjectItem | null = null;
  try {
    const res = await publicApi.getProjectBySlug(slug);
    if (res.success && res.data) {
      project = res.data;
    }
  } catch {
    project = null;
  }

  if (!project) return { title: "Project Not Found" };

  const content = locale === "bn" ? project.bn : project.en;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    title: `${content.title} | ${locale === "bn" ? "প্রজেক্ট বিবরণ" : "Project Details"}`,
    description: content.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/${content.slug}`,
      languages: {
        en: `${baseUrl}/en/projects/${project.en.slug}`,
        bn: `${baseUrl}/bn/projects/${project.bn.slug}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
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

  let project: ProjectItem | null = null;
  let allProjects: ProjectItem[] = [];

  try {
    const [projectRes, listRes] = await Promise.all([
      publicApi.getProjectBySlug(slug),
      publicApi.getProjects(),
    ]);

    if (projectRes.success && projectRes.data) {
      project = projectRes.data;
    }
    if (listRes.success && Array.isArray(listRes.data)) {
      allProjects = listRes.data;
    }
  } catch {
    project = null;
  }

  if (!project) {
    notFound();
  }

  const content = locale === "bn" ? project.bn : project.en;
  const study = content.caseStudy;

  const projectIndex = allProjects.findIndex(
    (p) => p.en.slug === slug || p.bn.slug === slug || p.id === project?._id || p._id === project?._id
  );

  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex !== -1 && projectIndex < allProjects.length - 1
      ? allProjects[projectIndex + 1]
      : null;

  const displayUrl = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "")
    : `${content.slug}.mehedi.dev`;

  return (
    <article className="py-10 sm:py-14 md:py-18">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
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
            <span className="text-emerald-400 font-medium truncate max-w-[180px] sm:max-w-[260px]">
              {content.title}
            </span>
          </nav>
        </div>

        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {content.title}
          </h1>

          {content.tagline && (
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {content.tagline}
            </p>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button size="default" variant="default" className="gap-2 text-xs sm:text-sm">
                  <ExternalLink className="w-4 h-4" />
                  <span>{dict.projects.viewLive}</span>
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button size="default" variant="terminal" className="gap-2 text-xs sm:text-sm">
                  <GithubIcon className="w-4 h-4" />
                  <span>{dict.projects.viewCode}</span>
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Large Prominent 16:9 Project Screenshot / Preview Window */}
        <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-[#090d16] shadow-2xl overflow-hidden font-mono">
          {/* Mockup Window Title Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-300 text-[11px] sm:text-xs">
              <span className="text-emerald-400">https://</span>
              <span>{displayUrl}</span>
            </div>

            <div className="text-[11px] text-slate-500 uppercase tracking-wider hidden sm:block">
              {project.category}
            </div>
          </div>

          {/* 16:9 Aspect Ratio Display / Placeholder Canvas */}
          <div className="relative w-full aspect-video bg-gradient-to-br from-[#0c121e] via-[#090d16] to-[#070a10] overflow-hidden flex flex-col items-center justify-center p-6 text-center">
            <div className="absolute inset-0 terminal-grid opacity-30 pointer-events-none" />

            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={content.title}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            ) : (
              <div className="relative z-10 max-w-xl mx-auto space-y-4">
                <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border-2 border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.25)] mx-auto">
                  <Globe className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-2xl font-bold text-white font-mono">
                    {content.title}
                  </h3>
                  {content.tagline && (
                    <p className="text-xs sm:text-sm text-slate-400 font-mono">
                      {content.tagline}
                    </p>
                  )}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900/90 border border-slate-800 text-slate-400 text-xs font-mono">
                  <span>Project Preview</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Section: Overview */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
            <span>{locale === "bn" ? "প্রজেক্টের বিবরণ" : "Project Overview"}</span>
          </h2>
          <div className="rounded-xl border border-slate-800 bg-[#0c101a] p-6 sm:p-8 space-y-4 text-slate-300 text-sm sm:text-base lg:text-[17px] leading-relaxed">
            <p>{content.description}</p>
            {study?.overview && <p>{study.overview}</p>}
          </div>
        </section>

        {/* Content Section: Key Features */}
        {content.highlights && content.highlights.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{dict.projects.keyFeatures}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-[#0c111a] p-5 flex items-start gap-3.5"
                >
                  <span className="text-emerald-400 font-bold text-base leading-none mt-1">✓</span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Content Section: Technology Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2.5">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>{locale === "bn" ? "ব্যবহৃত প্রযুক্তি" : "Technology Stack"}</span>
            </h2>
            <div className="rounded-xl border border-slate-800 bg-[#0c101a] p-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md text-xs sm:text-sm font-mono bg-slate-900 border border-slate-800 text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {study?.architecture && (
                <p className="text-xs sm:text-sm text-slate-400 pt-2 border-t border-slate-800/80 leading-relaxed font-sans">
                  {study.architecture}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Optional Clean Challenge & Solution */}
        {study && study.challenge && study.solution && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>{locale === "bn" ? "চ্যালেঞ্জ ও সমাধান" : "Challenge & Solution"}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-slate-800 bg-[#0c101a] p-6 space-y-2.5">
                <p className="text-xs font-mono uppercase text-rose-400 font-semibold tracking-wider">
                  {locale === "bn" ? "চ্যালেঞ্জ" : "The Challenge"}
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#0c101a] p-6 space-y-2.5">
                <p className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                  {locale === "bn" ? "সমাধান" : "The Solution"}
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {study.solution}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Pagination Links (Prev / Next Project) */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          {prevProject ? (
            <Link
              href={`/${locale}/projects/${locale === "bn" ? prevProject.bn.slug : prevProject.en.slug}`}
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="truncate max-w-[200px]">
                {locale === "bn" ? prevProject.bn.title : prevProject.en.title}
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
              <span className="truncate max-w-[200px]">
                {locale === "bn" ? nextProject.bn.title : nextProject.en.title}
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
