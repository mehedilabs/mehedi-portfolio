"use client";

import * as React from "react";
import { ArrowRight, Mail, FileText } from "lucide-react";
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
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      {/* Subtle Terminal Background Grids & Ambience */}
      <div className="absolute inset-0 terminal-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 text-xs font-mono text-emerald-400 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{dict.hero.badge}</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <p className="text-base sm:text-lg font-mono text-slate-400 font-medium">
            {dict.hero.greeting}
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            {dict.hero.name}
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-emerald-400 pt-1">
            {dict.hero.title}
          </h2>
        </div>

        {/* Short, Friendly Introduction */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {dict.hero.summary}
        </p>

        {/* Clear Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <a href="#projects">
            <Button variant="default" size="lg" className="gap-2 text-sm sm:text-base h-11 px-6">
              <span>{dict.hero.ctaPrimary}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <a href="#contact">
            <Button variant="terminal" size="lg" className="gap-2 text-sm sm:text-base h-11 px-6">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>{dict.hero.ctaSecondary}</span>
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" size="lg" className="gap-2 text-sm sm:text-base h-11 px-6 text-slate-300 hover:text-white">
              <FileText className="h-4 w-4 text-slate-400" />
              <span>{dict.hero.ctaResume}</span>
            </Button>
          </a>
        </div>

        {/* Social Reachout Links */}
        <div className="flex items-center justify-center gap-5 pt-4 text-xs font-mono text-slate-400">
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
    </section>
  );
}
