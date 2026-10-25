"use client";

import * as React from "react";
import { Locale, ProjectItem } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { ProjectCard } from "@/components/ui/ProjectCard";

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
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-[#0c101a] p-12 text-center text-slate-400 font-mono text-sm">
        {dict.projects.emptyState}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          locale={locale}
          dict={dict}
        />
      ))}
    </div>
  );
}
