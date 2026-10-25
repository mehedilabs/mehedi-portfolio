import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Home, Sparkles, Terminal, Mail } from "lucide-react";
import { isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { PROJECTS_DATA } from "@/data/portfolio-data";
import { Locale } from "@/types";
import { Button } from "@/components/ui/Button";
import { ProjectsArchiveGrid } from "@/components/sections/ProjectsArchiveGrid";

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

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{dict.projects.backToHome}</span>
          </Link>

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <Link href={`/${locale}`} className="flex items-center gap-1 hover:text-slate-300 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-400 font-medium">Projects</span>
          </nav>
        </div>

        {/* Header Hero Banner */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            <span>05. ARCHIVED_SYSTEMS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {dict.projects.allProjectsTitle}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg lg:text-[18px] max-w-3xl leading-[1.7]">
            {dict.projects.allProjectsSubtitle}
          </p>
        </div>

        {/* Interactive Filterable Projects Grid */}
        <ProjectsArchiveGrid
          projects={PROJECTS_DATA}
          locale={locale}
          dict={dict}
        />

        {/* Bottom Consulting & Enterprise CTA */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-[#0c101a] via-[#0f1524] to-[#0c101a] p-8 sm:p-12 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 terminal-grid opacity-30 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Systems Architecture</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {locale === "bn"
                ? "আপনার পরবর্তী বড় প্রকল্পের জন্য প্রস্তুত?"
                : "Need a custom high-performance web architecture?"}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {locale === "bn"
                ? "ফুল-স্ট্যাক ওয়েব আর্কিটেকচার, ডিস্ট্রিবিউটেড মাইক্রোসার্ভিস বা এন্টারপ্রাইজ স্কেলিং নিয়ে আলোচনা করতে আজই যোগাযোগ করুন।"
                : "Available for senior engineering leadership, high-impact consulting, and end-to-end full-stack systems engineering."}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link href={`/${locale}#contact`}>
                <Button variant="default" size="lg" className="gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{dict.hero.ctaSecondary}</span>
                </Button>
              </Link>
              <Link href={`/${locale}`}>
                <Button variant="terminal" size="lg" className="gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>{dict.projects.backToHome}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
