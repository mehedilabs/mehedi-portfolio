"use client";

import * as React from "react";
import { Calendar, MapPin, CheckCircle2, Briefcase } from "lucide-react";
import { Locale, ExperienceItem } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

interface ExperienceSectionProps {
  locale: Locale;
  dict: Dictionary;
  items?: ExperienceItem[];
  sectionTag?: string;
}

export function ExperienceSection({
  locale,
  dict,
  items = [],
  sectionTag,
}: ExperienceSectionProps) {
  const experiences = Array.isArray(items) ? items : [];

  return (
    <section id="experience" className="py-20 border-t border-slate-900 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Heading */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {sectionTag || dict.experience.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {dict.experience.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-[17px] max-w-3xl leading-relaxed">
            {dict.experience.subtitle}
          </p>
        </div>

        {/* Empty State or Timeline */}
        {experiences.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 bg-[#0b0f19]/60 p-16 text-center font-mono">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">
              {locale === "bn"
                ? "কর্মজীবন ও অভিজ্ঞতার বিবরণ শীঘ্রই আসছে"
                : "Career Timeline Coming Soon"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              {locale === "bn"
                ? "সিএমএস-এর মাধ্যমে পেশাদার অভিজ্ঞতা ও মাইলফলক শীঘ্রই আপডেট করা হবে।"
                : "Professional engineering timeline and leadership experience are currently being updated."}
            </p>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-800 ml-3 sm:ml-6 space-y-10 pl-6 sm:pl-10">
            {experiences.map((exp) => {
              const expContent =
                (locale === "bn" ? exp.bn : exp.en) || exp.en;
              const key = exp._id || exp.id;
              const achievements = Array.isArray(expContent?.achievements)
                ? expContent.achievements
                : [];
              const techStack = Array.isArray(exp.techStack)
                ? exp.techStack
                : [];

              return (
                <div key={key} className="relative group">
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
                    <CardContent className="p-6 sm:p-7 space-y-5">
                      {/* Header: Role, Period, Company */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                            <span>{expContent?.role}</span>
                            {exp.current && (
                              <Badge variant="terminal" className="text-[10px]">
                                {dict.experience.present}
                              </Badge>
                            )}
                          </h3>
                          <p className="text-emerald-400 font-mono text-xs sm:text-sm lg:text-[14.5px] mt-0.5">
                            {expContent?.company}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            {exp.period}
                          </span>
                          {expContent?.location && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                {expContent.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Overview Narrative */}
                      {expContent?.description && (
                        <p className="text-sm sm:text-base lg:text-[17px] text-slate-300 leading-[1.7]">
                          {expContent.description}
                        </p>
                      )}

                      {/* Key Contributions & Achievements */}
                      {achievements.length > 0 && (
                        <div className="space-y-2.5 pt-1">
                          <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold">
                            {dict.experience.responsibilitiesLabel}
                          </p>
                          <ul className="space-y-2.5 text-xs sm:text-sm lg:text-[15.5px] text-slate-300">
                            {achievements.map((ach, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span className="leading-[1.7]">{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technologies Tag Array */}
                      {techStack.length > 0 && (
                        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-mono text-slate-400 mr-2">
                            {dict.experience.technologiesUsed}
                          </span>
                          {techStack.map((tech) => (
                            <Badge key={tech} variant="tech">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
