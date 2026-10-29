"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { Locale, ProjectItem } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";

interface ProjectsSectionProps {
  locale: Locale;
  dict: Dictionary;
  projects?: ProjectItem[];
  sectionTag?: string;
}

export function ProjectsSection({ locale, dict, projects, sectionTag }: ProjectsSectionProps) {
  // Only render genuine CMS-persisted projects; no fabricated hardcoded demo projects
  const sourceProjects = Array.isArray(projects) ? projects : [];
  const featuredProjects = sourceProjects.filter((p) => p.featured !== false).slice(0, 4);

  const displayTag = sectionTag || dict.projects.sectionTag;
  const hasProjects = featuredProjects.length > 0;

  return (
    <section id="projects" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-900 bg-slate-50/50 dark:bg-[#050811] relative z-20 transition-colors">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Simple Section Header with View All Projects link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded bg-emerald-500" />
              {displayTag}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {dict.projects.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              {dict.projects.subtitle}
            </p>
          </div>

          {hasProjects && (
            <Link href={`/${locale}/projects`} className="shrink-0">
              <Button variant="terminal" size="sm" className="gap-2 font-mono text-xs group">
                <span>{dict.projects.seeAll}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </div>

        {/* Real Projects Grid or Localized Coming Soon Empty State */}
        {!hasProjects ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-12 text-center font-mono">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              {locale === "bn" ? "প্রজেক্ট শীঘ্রই আসছে" : "Projects Coming Soon"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              {locale === "bn"
                ? "সিএমএস-এর মাধ্যমে নতুন প্রজেক্ট এবং কেস স্টাডি শীঘ্রই যুক্ত করা হবে।"
                : "Real-world engineering projects and architectural case studies are currently being curated and published via the CMS."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id || project._id}
                project={project}
                locale={locale}
                dict={dict}
              />
            ))}
          </div>
        )}

        {/* Bottom View All Link for convenient mobile navigation */}
        {hasProjects && (
          <div className="mt-10 text-center sm:hidden">
            <Link href={`/${locale}/projects`}>
              <Button variant="outline" size="sm" className="w-full gap-2 font-mono text-xs text-slate-700 dark:text-slate-300">
                <span>{dict.projects.seeAll}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
