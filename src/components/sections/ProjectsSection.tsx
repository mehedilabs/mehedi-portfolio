"use client";

import * as React from "react";
import {
  FolderGit2,
  ExternalLink,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Locale, ProjectItem } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { PROJECTS_DATA } from "@/data/portfolio-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { CaseStudyModal } from "./CaseStudyModal";
import { cn } from "@/lib/utils";

interface ProjectsSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function ProjectsSection({ locale, dict }: ProjectsSectionProps) {
  const [filter, setFilter] = React.useState<string>("all");
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);

  const filterTabs = [
    { id: "all", label: dict.projects.filterAll },
    { id: "fullstack", label: dict.projects.filterFullstack },
    { id: "backend", label: dict.projects.filterBackend },
    { id: "cloud", label: dict.projects.filterCloud },
  ];

  const filteredProjects =
    filter === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 border-t border-slate-900 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Heading */}
        <div className="space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {dict.projects.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {dict.projects.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-[17px] max-w-3xl leading-relaxed">
            {dict.projects.subtitle}
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-md font-mono text-xs transition-all",
                filter === tab.id
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                  : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-[#0c101a] p-12 text-center text-slate-400 font-mono text-sm">
            {dict.projects.emptyState}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((project) => {
              const projectContent = locale === "bn" ? project.bn : project.en;

              return (
                <Card
                  key={project.id}
                  glow="emerald"
                  className="bg-[#0b0f19] border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    {/* Terminal Window Header Bar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-slate-300">~/systems/{projectContent.slug}</span>
                      </div>
                      {project.featured && (
                        <Badge variant="terminal" className="text-[10px]">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardHeader className="p-6 sm:p-7 pb-3 space-y-2">
                      <CardTitle className="text-lg sm:text-xl font-bold text-white hover:text-emerald-400 transition-colors">
                        {projectContent.title}
                      </CardTitle>
                      <p className="text-xs sm:text-sm font-mono text-emerald-400">
                        {projectContent.tagline}
                      </p>
                      <p className="text-sm sm:text-base lg:text-[17px] text-slate-300 leading-[1.7] pt-1">
                        {projectContent.description}
                      </p>
                    </CardHeader>

                    <CardContent className="px-6 sm:px-7 py-3 space-y-4">
                      {/* Architecture Highlights */}
                      <div className="space-y-1.5 bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/80 text-xs sm:text-sm text-slate-300">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                          {dict.projects.keyHighlights}
                        </p>
                        <ul className="space-y-1.5">
                          {projectContent.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 font-bold">›</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Performance Metric Badge if present */}
                      {projectContent.metrics && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{projectContent.metrics}</span>
                        </div>
                      )}

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="tech">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>

                  {/* Actions Footer */}
                  <CardFooter className="p-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="default" className="gap-1.5 text-xs">
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

                    {projectContent.caseStudy && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedProject(project)}
                        className="gap-1.5 text-xs text-slate-300 hover:text-white"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{dict.projects.readCaseStudy}</span>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        {/* Case Study Modal */}
        <CaseStudyModal
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          locale={locale}
          dict={dict}
        />
      </div>
    </section>
  );
}
