"use client";

import * as React from "react";
import {
  Terminal,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
  GraduationCap,
  Sparkles,
  Compass,
  Code2,
  Cpu,
} from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface AboutSectionProps {
  locale?: Locale;
  dict: Dictionary;
}

export function AboutSection({ dict }: AboutSectionProps) {
  const principleIcons = [Layers, ShieldCheck, Zap, Globe];

  const focusChips = [
    { label: "Full-Stack Next.js 16", icon: Code2 },
    { label: "Distributed Express APIs", icon: Cpu },
    { label: "MongoDB & Data Modeling", icon: Layers },
    { label: "Type-Safe Architecture", icon: ShieldCheck },
  ];

  return (
    <section id="about" className="py-20 border-t border-slate-900 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10 space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {dict.about.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {dict.about.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-[17px] max-w-3xl leading-relaxed">
            {dict.about.subtitle}
          </p>
        </div>

        {/* Approachable Bio & Credentials Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Identity & Highlights Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Profile Identity Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c101a] p-6 sm:p-7 space-y-5 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/40 flex items-center justify-center text-emerald-400 text-2xl font-bold font-mono shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0">
                  <Terminal className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-mono">
                    Mehedi Hasan
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-400 font-mono mt-0.5">
                    Lead Full-Stack Architect
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Dhaka, Bangladesh • Available Worldwide
                  </p>
                </div>
              </div>

              {/* Verified Metrics Counter Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                  <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                    6+ Years
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                    Production Exp.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                  <p className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                    40+ Systems
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                    Delivered
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                  <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                    99.98%
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                    System Uptime
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                  <p className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                    B.Sc. CSE
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                    CS Degree
                  </p>
                </div>
              </div>

              {/* Core Focus Chips */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Core Architectural Focus:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {focusChips.map((chip, idx) => {
                    const Icon = chip.icon;
                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300"
                      >
                        <Icon className="w-3 h-3 text-emerald-400" />
                        <span>{chip.label}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Rule 0 Callout */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 font-mono text-xs text-emerald-300 flex items-start gap-3 shadow-lg">
              <Terminal className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-white uppercase tracking-wider">Rule 0 Principle:</span>
                <p className="text-emerald-200/90 leading-relaxed font-sans text-xs sm:text-sm">
                  &quot;Keep architecture decoupled, keep dependencies intentional, and design data structures that serve multiple languages natively.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Journey & Academic Background */}
          <div className="lg:col-span-7 space-y-6">
            {/* Bio Narrative */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c101a] p-6 sm:p-8 space-y-5 text-slate-300 text-base sm:text-lg lg:text-[17.5px] leading-[1.75] shadow-xl">
              <p>{dict.about.bioParagraph1}</p>
              <p>{dict.about.bioParagraph2}</p>
              <p>{dict.about.bioParagraph3}</p>
            </div>

            {/* Learning Journey & Technical Evolution */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c111a] p-6 sm:p-7 space-y-3 shadow-lg">
              <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>{dict.about.journeyTitle}</span>
              </div>
              <p className="text-sm sm:text-base lg:text-[16.5px] text-slate-300 leading-[1.7] font-sans">
                {dict.about.journeyText}
              </p>
            </div>

            {/* Academic Foundation */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c111a] p-6 sm:p-7 space-y-3 shadow-lg">
              <div className="flex items-center gap-2.5 text-emerald-400 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>{dict.about.educationTitle}</span>
              </div>
              <p className="text-sm sm:text-base lg:text-[16.5px] text-slate-300 leading-[1.7] font-sans">
                {dict.about.educationText}
              </p>
            </div>
          </div>
        </div>

        {/* Engineering Principles Section */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{dict.about.principlesTitle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {dict.about.principles.map((item, idx) => {
              const IconComponent = principleIcons[idx % principleIcons.length];
              return (
                <Card
                  key={idx}
                  glow="emerald"
                  className="bg-[#0c111a] border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
                >
                  <CardHeader className="p-5 pb-2">
                    <div className="w-9 h-9 rounded-lg bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-emerald-400 mb-3">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <CardTitle className="text-base font-semibold text-slate-100">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {item.description}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
