"use client";

import * as React from "react";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { EXPERIENCE_DATA } from "@/data/portfolio-data";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

interface ExperienceSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function ExperienceSection({ locale, dict }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 border-t border-slate-900 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {dict.experience.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {dict.experience.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            {dict.experience.subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-3 sm:ml-6 space-y-10 pl-6 sm:pl-10">
          {EXPERIENCE_DATA.map((exp) => {
            const expContent = locale === "bn" ? exp.bn : exp.en;

            return (
              <div key={exp.id} className="relative group">
                {/* Glowing Timeline Marker */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full border-2 border-emerald-500 bg-slate-950 group-hover:scale-125 transition-transform duration-200">
                    {exp.current && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    )}
                  </div>
                </div>

                {/* Experience Card */}
                <Card glow="emerald" className="bg-[#0c101a] border-slate-800">
                  <CardContent className="p-6 space-y-4">
                    {/* Header: Role, Period, Company */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <span>{expContent.role}</span>
                          {exp.current && (
                            <Badge variant="terminal" className="text-[10px]">
                              {dict.experience.present}
                            </Badge>
                          )}
                        </h3>
                        <p className="text-emerald-400 font-mono text-xs sm:text-sm mt-0.5">
                          {expContent.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {exp.period}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {expContent.location}
                        </span>
                      </div>
                    </div>

                    {/* Overview Narrative */}
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {expContent.description}
                    </p>

                    {/* Key Contributions & Achievements */}
                    <div className="space-y-2 pt-1">
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        {dict.experience.responsibilitiesLabel}
                      </p>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                        {expContent.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Tag Array */}
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-mono text-slate-500 mr-2">
                        {dict.experience.technologiesUsed}
                      </span>
                      {exp.techStack.map((tech) => (
                        <Badge key={tech} variant="tech">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
