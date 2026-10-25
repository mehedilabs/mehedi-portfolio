"use client";

import * as React from "react";
import { ArrowRight, Mail, FileText, User } from "lucide-react";
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
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Subtle Terminal Background Grids & Ambience */}
      <div className="absolute inset-0 terminal-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Greeting, Name, Role, Intro, Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-mono text-emerald-400 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{dict.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
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
            <p className="text-base sm:text-lg lg:text-[18px] text-slate-300 max-w-2xl leading-relaxed">
              {dict.hero.summary}
            </p>

            {/* Clear Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
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
            <div className="flex items-center gap-4 pt-3 text-xs font-mono text-slate-400">
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

          {/* Right Column: Profile Photo on Right Side Exactly as Intended */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/40 via-cyan-500/30 to-emerald-500/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full w-full rounded-2xl border-2 border-slate-700 bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-4 shadow-2xl">
                <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-slate-800 to-slate-950 flex flex-col items-center justify-center text-center p-6 border border-slate-800">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-emerald-400/60 bg-slate-800/80 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.2)] mb-3 group-hover:scale-105 transition-transform">
                    <User className="h-12 w-12 sm:h-14 sm:w-14 text-slate-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 font-mono">
                    Mehedi Hasan
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1">
                    Full-Stack Developer
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80 text-[11px] font-mono text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <span>{dict.site.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
