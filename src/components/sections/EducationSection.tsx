"use client";

import * as React from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { Locale, EducationItem, CertificationItem } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

interface EducationSectionProps {
  locale: Locale;
  dict: Dictionary;
  items?: EducationItem[];
  certifications?: CertificationItem[];
  sectionTag?: string;
}

export function EducationSection({
  locale,
  dict,
  items = [],
  certifications = [],
  sectionTag,
}: EducationSectionProps) {
  const educations = Array.isArray(items) ? items : [];
  const certs = Array.isArray(certifications) ? certifications : [];

  return (
    <section id="education" className="py-20 border-t border-slate-900 bg-[#080b12]/50 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Heading */}
        <div className="space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {sectionTag || dict.education.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {dict.education.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-[17px] max-w-3xl leading-relaxed">
            {dict.education.subtitle}
          </p>
        </div>

        {/* Empty State or Content */}
        {educations.length === 0 && certs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 bg-[#0b0f19]/60 p-16 text-center font-mono">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-3">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">
              {locale === "bn"
                ? "শিক্ষাগত বিবরণ শীঘ্রই আসছে"
                : "Academic Records Coming Soon"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              {locale === "bn"
                ? "সিএমএস-এর মাধ্যমে শিক্ষাগত ডিগ্রি ও সার্টিফিকেশন শীঘ্রই আপডেট করা হবে।"
                : "Academic degrees, credentials, and certifications are currently being updated."}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {educations.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {educations.map((item) => {
                  const edu =
                    (locale === "bn" ? item.bn : item.en) || item.en;
                  const key = item._id || item.id;
                  const courses = Array.isArray(edu?.courses) ? edu.courses : [];

                  return (
                    <Card key={key} glow="cyan" className="bg-[#0c101a] border-slate-800">
                      <CardContent className="p-6 sm:p-7 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <h3 className="text-base sm:text-lg font-bold text-white">
                              {edu?.degree}
                            </h3>
                            <p className="text-xs sm:text-sm lg:text-[14.5px] font-mono text-emerald-400">
                              {edu?.institution}
                            </p>
                            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-slate-400 pt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                {item.period}
                              </span>
                              {edu?.location && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                    {edu.location}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {edu?.description && (
                          <p className="text-sm sm:text-base lg:text-[15.5px] text-slate-300 leading-[1.7] pt-2 border-t border-slate-800/80">
                            {edu.description}
                          </p>
                        )}

                        {courses.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-400">
                              {dict.education.coursesLabel}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {courses.map((course, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Certifications Subsection if present */}
            {certs.length > 0 && (
              <div className="pt-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Certifications &amp; Credentials</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {certs.map((cert) => {
                    const key = cert._id || cert.id || cert.name;
                    return (
                      <div
                        key={key}
                        className="p-4 rounded-xl border border-slate-800 bg-[#0c101a] space-y-1"
                      >
                        <h4 className="text-sm font-bold text-white">{cert.name}</h4>
                        <p className="text-xs text-emerald-400 font-mono">{cert.issuer}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{cert.issueDate}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
