/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Globe } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Locale, ProjectItem } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Button } from "@/components/ui/Button";

interface ProjectCardProps {
  project: ProjectItem;
  locale: Locale;
  dict: Dictionary;
}

export function ProjectCard({ project, locale, dict }: ProjectCardProps) {
  const content = locale === "bn" ? project.bn : project.en;
  const [imageError, setImageError] = React.useState(false);

  // Derive preview URL display text
  const displayUrl = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "")
    : `${content.slug}.mehedi.dev`;

  return (
    <div className="group rounded-xl border border-slate-800 bg-[#0c101a] hover:border-slate-700/90 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col overflow-hidden">
      {/* 16:9 Screenshot / Visual Preview Area */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-slate-900 via-[#0a0e18] to-slate-950 border-b border-slate-800/80 overflow-hidden">
        {/* Subtle mock browser window bar */}
        <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-3.5 py-2 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/60 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[10px] text-slate-400 truncate max-w-[180px] font-mono">
            {displayUrl}
          </span>
          <span className="w-4" />
        </div>

        {/* Real Screenshot or Fallback Visual Preview */}
        {project.thumbnail && !imageError ? (
          <img
            src={project.thumbnail}
            alt={content.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top pt-7 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full pt-7 flex flex-col items-center justify-center p-4 relative text-center">
            <div className="absolute inset-0 terminal-grid opacity-25 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <p className="text-xs font-mono font-medium text-slate-300 max-w-[220px] truncate">
                {content.title}
              </p>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/90 text-emerald-400 border border-emerald-500/20">
                {project.category}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Compact Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          <Link href={`/${locale}/projects/${content.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
              {content.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {content.description}
          </p>

          {/* Technology Labels */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded text-slate-500">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between gap-2">
          <Link href={`/${locale}/projects/${content.slug}`}>
            <Button size="sm" variant="default" className="gap-1.5 text-xs h-8 px-3">
              <span>{dict.projects.viewDetails}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>

          <div className="flex items-center gap-1.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={dict.projects.viewLive}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 text-xs h-8 px-2.5 text-slate-300 hover:text-white"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{dict.projects.viewLive}</span>
                </Button>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={dict.projects.viewCode}
                aria-label={dict.projects.viewCode}
              >
                <Button
                  size="sm"
                  variant="terminal"
                  className="h-8 w-8 p-0 flex items-center justify-center text-slate-300 hover:text-white"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
