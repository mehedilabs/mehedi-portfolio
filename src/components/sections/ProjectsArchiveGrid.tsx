"use client";

import * as React from "react";
import Link from "next/link";
import {
  FolderGit2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Cloud,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Locale, ProjectItem } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ProjectsArchiveGridProps {
  projects: ProjectItem[];
  locale: Locale;
  dict: Dictionary;
}

export function ProjectsArchiveGrid({
  projects,
  locale,
  dict,
}: ProjectsArchiveGridProps) {
  const [filter, setFilter] = React.useState<string>("all");

  const filterTabs = [
    { id: "all", label: dict.projects.filterAll, count: projects.length },
    {
      id: "fullstack",
      label: dict.projects.filterFullstack,
      count: projects.filter((p) => p.category === "fullstack").length,
    },
    {
      id: "backend",
      label: dict.projects.filterBackend,
      count: projects.filter((p) => p.category === "backend").length,
    },
    {
      id: "cloud",
      label: dict.projects.filterCloud,
      count: projects.filter((p) => p.category === "cloud").length,
    },
  ];

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fullstack":
        return Layers;
      case "backend":
        return Cpu;
      case "cloud":
        return Cloud;
      default:
        return FolderGit2;
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Filter Pills with Item Counts */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="flex flex-wrap items-center gap-2" role="tablist">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={filter === tab.id}
              onClick={() => setFilter(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all",
                filter === tab.id
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                  : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded text-[10px] font-mono",
                  filter === tab.id
                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                    : "bg-slate-800 text-slate-400"
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-400">
          {locale === "bn"
            ? `প্রদর্শিত হচ্ছে ${filtered.length} টি সিস্টেম`
            : `Showing ${filtered.length} production ${filtered.length === 1 ? "system" : "systems"}`}
        </div>
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-[#0c101a] p-16 text-center text-slate-400 font-mono text-sm">
          {dict.projects.emptyState}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filtered.map((project) => {
            const content = locale === "bn" ? project.bn : project.en;
            const CategoryIcon = getCategoryIcon(project.category);

            return (
              <Card
                key={project.id}
                glow="emerald"
                className="bg-[#0b0f19] border-slate-800 flex flex-col justify-between group/card hover:border-slate-700 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Terminal Header Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2 truncate">
                      <CategoryIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-slate-300 truncate">~/systems/{content.slug}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.featured && (
                        <Badge variant="terminal" className="text-[10px]">
                          Featured
                        </Badge>
                      )}
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Visual Banner */}
                  <div className="relative h-44 w-full bg-gradient-to-br from-slate-900 via-[#0c121e] to-slate-950 border-b border-slate-800/80 overflow-hidden flex flex-col justify-between p-5">
                    <div className="absolute inset-0 terminal-grid opacity-30 pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/80 text-emerald-400">
                        sys.v1.0
                      </span>
                      {content.metrics && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono">
                          <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate max-w-[200px]">{content.metrics}</span>
                        </div>
                      )}
                    </div>

                    <div className="relative z-10">
                      <p className="text-xs font-mono text-emerald-400 line-clamp-1">
                        {content.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <CardHeader className="p-6 sm:p-7 pb-3 space-y-2">
                    <Link href={`/${locale}/projects/${content.slug}`}>
                      <CardTitle className="text-xl font-bold text-white group-hover/card:text-emerald-400 transition-colors cursor-pointer">
                        {content.title}
                      </CardTitle>
                    </Link>
                    <p className="text-sm sm:text-base text-slate-300 leading-[1.7] pt-1">
                      {content.description}
                    </p>
                  </CardHeader>

                  <CardContent className="px-6 sm:px-7 py-3 space-y-4">
                    {/* Key Architecture Highlights */}
                    <div className="space-y-1.5 bg-slate-950/40 p-4 rounded-lg border border-slate-800/80 text-xs sm:text-sm text-slate-300">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                        {dict.projects.keyHighlights}
                      </p>
                      <ul className="space-y-1.5">
                        {content.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="tech">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>

                {/* Card Actions Footer */}
                <CardFooter className="p-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <Link href={`/${locale}/projects/${content.slug}`}>
                    <Button size="sm" variant="default" className="gap-2 text-xs">
                      <span>{dict.projects.viewDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="outline" className="gap-1.5 text-xs text-slate-300 hover:text-white">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{dict.projects.viewLive}</span>
                        </Button>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="terminal" className="gap-1.5 text-xs">
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>{dict.projects.viewCode}</span>
                        </Button>
                      </a>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
