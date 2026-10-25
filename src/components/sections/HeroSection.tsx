"use client";

import * as React from "react";
import {
  Terminal,
  ArrowRight,
  Download,
  Mail,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { CONTACT_INFO } from "@/data/portfolio-data";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  locale?: Locale;
  dict: Dictionary;
}

export function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Subtle Terminal Background Grids */}
      <div className="absolute inset-0 terminal-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-mono text-emerald-400 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{dict.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="font-mono text-sm sm:text-base text-emerald-400 font-medium tracking-wide">
                {dict.hero.greeting}
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {dict.hero.name}
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300 mt-2 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent">
                {dict.hero.title}
              </h2>
            </div>

            {/* Summary */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              {dict.hero.summary}
            </p>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  {dict.hero.yearsExp}
                </p>
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                  Experience
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                  {dict.hero.projectsDelivered}
                </p>
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                  Production
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  {dict.hero.uptime}
                </p>
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                  Uptime Metric
                </p>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#projects">
                <Button variant="default" size="lg" className="gap-2 text-sm">
                  <span>{dict.hero.ctaPrimary}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#contact">
                <Button variant="terminal" size="lg" className="gap-2 text-sm">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span>{dict.hero.ctaSecondary}</span>
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" size="lg" className="gap-2 text-sm">
                  <Download className="h-4 w-4 text-slate-400" />
                  <span>{dict.hero.ctaResume}</span>
                </Button>
              </a>
            </div>

            {/* Social Reachout */}
            <div className="flex items-center gap-4 pt-4 text-xs font-mono text-slate-400">
              <span className="text-slate-500">Connect:</span>
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">/</span>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700">/</span>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Prominent Profile Photo & Interactive Terminal Console */}
          <div className="lg:col-span-5 space-y-6">
            {/* Profile Photo Display with Terminal Border */}
            <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/40 via-cyan-500/30 to-emerald-500/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full w-full rounded-2xl border-2 border-slate-700 bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-4">
                {/* Developer Avatar Placeholder */}
                <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-slate-800 to-slate-950 flex flex-col items-center justify-center text-center p-6 border border-slate-800">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-emerald-400/60 bg-slate-800/80 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.2)] mb-4">
                    <Terminal className="h-12 w-12 sm:h-14 sm:w-14" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 font-mono">
                    Mehedi Hasan
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1">
                    Senior Full-Stack Architect
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80 text-[11px] font-mono text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <span>{dict.site.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Window Widget */}
            <div className="rounded-xl border border-slate-800 bg-[#0c111c] shadow-2xl overflow-hidden font-mono text-xs">
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[11px] text-slate-400 select-none">
                  {dict.hero.terminalTab}
                </div>
                <div className="w-8" />
              </div>

              {/* Terminal Content */}
              <div className="p-4 space-y-2 text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <span>$</span>
                  <span className="text-slate-200">{dict.hero.command}</span>
                </div>
                <div className="space-y-1.5 text-slate-400 pt-1 text-[11px] sm:text-xs leading-relaxed">
                  {dict.hero.outputLines.map((line, idx) => (
                    <div
                      key={idx}
                      className={idx === dict.hero.outputLines.length - 1 ? "text-emerald-400 font-medium" : ""}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
