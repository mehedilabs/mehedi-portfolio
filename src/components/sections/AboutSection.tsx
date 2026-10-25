"use client";

import * as React from "react";
import { Terminal, ShieldCheck, Zap, Globe, Layers } from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface AboutSectionProps {
  locale?: Locale;
  dict: Dictionary;
}

export function AboutSection({ dict }: AboutSectionProps) {
  const principleIcons = [Layers, ShieldCheck, Zap, Globe];

  return (
    <section id="about" className="py-20 border-t border-slate-900 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {dict.about.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {dict.about.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            {dict.about.subtitle}
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Bio Column */}
          <div className="lg:col-span-6 space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="rounded-xl border border-slate-800 bg-[#0c101a] p-6 space-y-4">
              <p>{dict.about.bioParagraph1}</p>
              <p>{dict.about.bioParagraph2}</p>
              <p>{dict.about.bioParagraph3}</p>
            </div>

            {/* Terminal Philosophy Callout */}
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-4 font-mono text-xs text-emerald-300 flex items-start gap-3">
              <Terminal className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Rule 0:</span> &quot;Keep architecture decoupled, keep dependencies intentional, and design data structures that serve multiple languages natively.&quot;
              </div>
            </div>
          </div>

          {/* Right Principles Cards */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {dict.about.principlesTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dict.about.principles.map((item, idx) => {
                const IconComponent = principleIcons[idx % principleIcons.length];
                return (
                  <Card key={idx} glow="emerald" className="bg-[#0c111a] border-slate-800/80">
                    <CardHeader className="p-4 pb-2">
                      <div className="w-8 h-8 rounded-md bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-emerald-400 mb-2">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <CardTitle className="text-sm font-semibold text-slate-100">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-1 text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
