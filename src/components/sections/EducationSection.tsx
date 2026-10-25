"use client";

import * as React from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { EDUCATION_DATA } from "@/data/portfolio-data";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

interface EducationSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function EducationSection({ locale, dict }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 border-t border-slate-900 bg-[#080b12]/50 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Heading */}
        <div className="space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {dict.education.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {dict.education.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-[17px] max-w-3xl leading-relaxed">
            {dict.education.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {EDUCATION_DATA.map((item) => {
            const edu = locale === "bn" ? item.bn : item.en;

            return (
              <Card key={item.id} glow="cyan" className="bg-[#0c101a] border-slate-800">
                <CardContent className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-[14.5px] font-mono text-emerald-400">
                        {edu.institution}
                      </p>
                      <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {item.period}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {edu.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base lg:text-[15.5px] text-slate-300 leading-[1.7] pt-2 border-t border-slate-800/80">
                    {edu.description}
                  </p>

                  <div className="space-y-2 pt-1">
                    <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-400">
                      {dict.education.coursesLabel}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.courses.map((course, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
