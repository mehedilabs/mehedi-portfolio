"use client";

import * as React from "react";
import { Modal } from "@/components/ui/Modal";
import { ProjectItem, Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExternalLink, CheckCircle2, Network } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface CaseStudyModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
}

export function CaseStudyModal({
  project,
  isOpen,
  onClose,
  locale,
  dict,
}: CaseStudyModalProps) {
  if (!project) return null;

  const content = locale === "bn" ? project.bn : project.en;
  const study = content.caseStudy;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={content.title}
      className="max-w-4xl"
    >
      <div className="space-y-6 text-slate-300">
        {/* Subtitle & Tech Badges */}
        <div className="space-y-3">
          <p className="text-sm font-mono text-emerald-400">
            {content.tagline}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="tech">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-1 border-b border-slate-800 pb-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
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
              className="inline-flex"
            >
              <Button size="sm" variant="terminal" className="gap-1.5 text-xs">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>{dict.projects.viewCode}</span>
              </Button>
            </a>
          )}
        </div>

        {study ? (
          <div className="space-y-6 text-sm">
            {/* Overview */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {dict.caseStudy.overview}
              </h4>
              <p className="leading-relaxed bg-slate-900/40 p-4 rounded-lg border border-slate-800">
                {study.overview}
              </p>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-wider text-rose-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  {dict.caseStudy.challenge}
                </h4>
                <div className="p-4 rounded-lg border border-rose-950/40 bg-rose-950/10 text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[140px]">
                  {study.challenge}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {dict.caseStudy.solution}
                </h4>
                <div className="p-4 rounded-lg border border-emerald-950/40 bg-emerald-950/10 text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[140px]">
                  {study.solution}
                </div>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                {dict.caseStudy.architecture}
              </h4>
              <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/60 font-mono text-xs text-slate-300 leading-relaxed">
                {study.architecture}
              </div>
            </div>

            {/* Measurable Results */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {dict.caseStudy.results}
              </h4>
              <ul className="space-y-2">
                {study.results.map((res, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-300"
                  >
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-slate-400 text-sm font-mono">
            Detailed case study in preparation for Phase 2.
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            {dict.caseStudy.close}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
