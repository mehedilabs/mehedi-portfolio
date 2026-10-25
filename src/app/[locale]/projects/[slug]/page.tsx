import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { PROJECTS_DATA } from "@/data/portfolio-data";
import { Locale } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ExternalLink, CheckCircle2, Network } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

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

  const project = PROJECTS_DATA.find(
    (p) => p.en.slug === slug || p.bn.slug === slug
  );

  if (!project) {
    notFound();
  }

  const content = locale === "bn" ? project.bn : project.en;
  const study = content.caseStudy;

  return (
    <article className="py-16 mx-auto max-w-4xl xl:max-w-5xl px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
      {/* Return Back Link */}
      <Link
        href={`/${locale}#projects`}
        className="inline-flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to All Systems</span>
      </Link>

      {/* Header */}
      <div className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="terminal">System Architecture</Badge>
          <Badge variant="outline">{project.category.toUpperCase()}</Badge>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {content.title}
        </h1>

        <p className="text-lg font-mono text-emerald-400">
          {content.tagline}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="tech">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="default" className="gap-1.5 text-xs">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{dict.projects.viewLive}</span>
              </Button>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="terminal" className="gap-1.5 text-xs">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>{dict.projects.viewCode}</span>
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Overview & Case Study Deep-Dive */}
      <div className="space-y-8 text-slate-300">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            Executive Summary
          </h2>
          <p className="text-base sm:text-lg lg:text-[17px] text-slate-300 leading-[1.7] bg-[#0c101a] p-6 rounded-xl border border-slate-800">
            {content.description}
          </p>
        </div>

        {study && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-rose-400 font-semibold">
                  Architectural Challenge
                </h3>
                <div className="p-5 rounded-lg border border-rose-950/40 bg-rose-950/10 text-sm sm:text-base text-slate-300 leading-[1.7]">
                  {study.challenge}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                  Engineering Solution
                </h3>
                <div className="p-5 rounded-lg border border-emerald-950/40 bg-emerald-950/10 text-sm sm:text-base text-slate-300 leading-[1.7]">
                  {study.solution}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                Architecture & Data Flow
              </h3>
              <div className="p-5 rounded-lg border border-slate-800 bg-slate-900/60 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
                {study.architecture}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Measurable Impact & Metrics
              </h3>
              <ul className="space-y-2 bg-[#0c101a] p-5 rounded-lg border border-slate-800">
                {study.results.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
