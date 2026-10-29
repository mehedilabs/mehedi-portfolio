import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Home, Mail, Code2 } from "lucide-react";
import { isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { Locale, ProjectItem } from "@/types";
import { publicApi } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";
import { ProjectsArchiveGrid } from "@/components/sections/ProjectsArchiveGrid";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "bn" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = dictionaries[locale];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    title: `${dict.projects.allProjectsTitle} | ${dict.site.name}`,
    description: dict.projects.allProjectsSubtitle,
    alternates: {
      canonical: `${baseUrl}/${locale}/projects`,
      languages: {
        en: `${baseUrl}/en/projects`,
        bn: `${baseUrl}/bn/projects`,
        "x-default": `${baseUrl}/en/projects`,
      },
    },
    openGraph: {
      title: `${dict.projects.allProjectsTitle} | ${dict.site.name}`,
      description: dict.projects.allProjectsSubtitle,
      url: `${baseUrl}/${locale}/projects`,
      siteName: dict.site.name,
      locale: locale === "bn" ? "bn_BD" : "en_US",
      type: "website",
    },
  };
}

export default async function ProjectsArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dict = dictionaries[locale];

  let projects: ProjectItem[] = [];
  try {
    const res = await publicApi.getProjects();
    if (res.success && Array.isArray(res.data)) {
      projects = res.data;
    }
  } catch {
    projects = [];
  }

  return (
    <div className="py-10 sm:py-14 md:py-18">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10 space-y-8 sm:space-y-10">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{dict.projects.backToHome}</span>
          </Link>

          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-xs text-slate-500"
          >
            <Link
              href={`/${locale}`}
              className="flex items-center gap-1 hover:text-slate-300 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-400 font-medium">Projects</span>
          </nav>
        </div>

        {/* Clean Header */}
        <div className="space-y-2 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {dict.projects.allProjectsTitle}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-[17px] leading-relaxed">
            {dict.projects.allProjectsSubtitle}
          </p>
        </div>

        {/* Grid of real CMS projects or Coming Soon empty state */}
        {projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 bg-[#0b0f19]/60 p-16 text-center font-mono">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">
              {locale === "bn" ? "প্রজেক্ট শীঘ্রই আসছে" : "Projects Coming Soon"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              {locale === "bn"
                ? "সিএমএস-এর মাধ্যমে নতুন প্রজেক্ট এবং কেস স্টাডি শীঘ্রই যুক্ত করা হবে।"
                : "Real-world engineering projects and architectural case studies are currently being curated and published via the CMS."}
            </p>
          </div>
        ) : (
          <ProjectsArchiveGrid
            projects={projects}
            locale={locale}
            dict={dict}
          />
        )}

        {/* Simple Bottom Return / Contact Action */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <Link href={`/${locale}`}>
            <Button variant="outline" size="sm" className="gap-2 font-mono text-xs text-slate-300">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{dict.projects.backToHome}</span>
            </Button>
          </Link>

          <Link href={`/${locale}#contact`}>
            <Button variant="terminal" size="sm" className="gap-2 font-mono text-xs">
              <Mail className="w-3.5 h-3.5" />
              <span>{dict.hero.ctaSecondary}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
