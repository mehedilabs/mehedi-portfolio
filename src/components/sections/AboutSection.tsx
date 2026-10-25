"use client";

import * as React from "react";
import { User, Sparkles, ArrowRight } from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Button } from "@/components/ui/Button";

interface AboutSectionProps {
  locale?: Locale;
  dict: Dictionary;
}

export function AboutSection({ locale, dict }: AboutSectionProps) {
  const coreSkills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "REST APIs",
  ];

  return (
    <section id="about" className="py-16 sm:py-24 border-t border-slate-900 relative">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            <span>{dict.about.sectionTag}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {dict.about.title}
          </h2>
        </div>

        {/* Balanced Two-Column Layout (Desktop) / Natural Stack (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Column 1: Dedicated Neutral Profile Photo Placeholder */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-square rounded-2xl border border-slate-800 bg-[#0c101a] p-4 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-cyan-500/10 opacity-60 pointer-events-none" />
              <div className="absolute inset-0 terminal-grid opacity-20 pointer-events-none" />

              {/* Neutral Avatar Placeholder */}
              <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-emerald-500/30 bg-slate-900/90 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)] mb-4 group-hover:scale-105 transition-transform">
                <User className="w-14 h-14 sm:w-16 sm:h-16 text-slate-400" />
              </div>

              {/* Identity Details */}
              <div className="relative z-10 space-y-1">
                <h3 className="text-lg font-bold text-white font-mono">
                  Mehedi Hasan
                </h3>
                <p className="text-xs font-mono text-emerald-400">
                  Full-Stack Developer
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>Profile Photo Placeholder</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Concise, Friendly Introduction */}
          <div className="md:col-span-7 space-y-5 text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {locale === "bn"
                ? "পরিচ্ছন্ন, আধুনিক ও ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন নির্মাণে নিবেদিত。"
                : "Building clean, modern, and user-friendly web applications."}
            </h3>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base lg:text-[17px] leading-relaxed">
              <p>{dict.about.bioParagraph1}</p>
              <p>{dict.about.bioParagraph2}</p>
              <p>{dict.about.bioParagraph3}</p>
            </div>

            {/* Core Technologies Pills */}
            <div className="pt-2 space-y-2">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                {locale === "bn" ? "প্রধান প্রযুক্তিসমূহ:" : "Primary Technologies:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-2">
              <a href="#contact">
                <Button variant="terminal" size="sm" className="gap-2 font-mono text-xs">
                  <span>{dict.hero.ctaSecondary}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
