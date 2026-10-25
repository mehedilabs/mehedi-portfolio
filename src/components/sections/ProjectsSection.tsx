"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { PROJECTS_DATA } from "@/data/portfolio-data";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";

interface ProjectsSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function ProjectsSection({ locale, dict }: ProjectsSectionProps) {
  // Show exactly 4 featured project cards on the homepage
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="projects" className="py-16 sm:py-20 border-t border-slate-900 bg-[#050811] relative z-20">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Simple Section Header with View All Projects link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded bg-emerald-500" />
              {dict.projects.sectionTag}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              {dict.projects.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              {dict.projects.subtitle}
            </p>
          </div>

          <Link href={`/${locale}/projects`} className="shrink-0">
            <Button variant="terminal" size="sm" className="gap-2 font-mono text-xs group">
              <span>{dict.projects.seeAll}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* 3 columns on desktop (4th card wraps naturally), 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>

        {/* Bottom View All Link for convenient mobile navigation */}
        <div className="mt-10 text-center sm:hidden">
          <Link href={`/${locale}/projects`}>
            <Button variant="outline" size="sm" className="w-full gap-2 font-mono text-xs text-slate-300">
              <span>{dict.projects.seeAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
