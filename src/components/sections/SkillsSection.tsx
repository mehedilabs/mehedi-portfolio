"use client";

import * as React from "react";
import {
  Layout,
  Server,
  Database,
  Cloud,
  Terminal,
  Zap,
} from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { SKILL_CATEGORIES } from "@/data/portfolio-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function SkillsSection({ locale, dict }: SkillsSectionProps) {
  const [activeTab, setActiveTab] = React.useState<string>("all");

  const categoryIcons: Record<string, React.ElementType> = {
    frontend: Layout,
    backend: Server,
    database: Database,
    cloud: Cloud,
  };

  const filteredCategories =
    activeTab === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="py-20 border-t border-slate-900 bg-[#080b12]/50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {dict.skills.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {dict.skills.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            {dict.skills.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "all"}
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-md font-mono text-xs transition-all",
              activeTab === "all"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            All Competencies
          </button>
          {SKILL_CATEGORIES.map((cat) => {
            const IconComp = categoryIcons[cat.id] || Terminal;
            const title = locale === "bn" ? cat.bn.title : cat.en.title;
            const isSelected = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs transition-all",
                  isSelected
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                    : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => {
            const IconComp = categoryIcons[category.id] || Terminal;
            const catContent = locale === "bn" ? category.bn : category.en;

            return (
              <Card
                key={category.id}
                glow="emerald"
                className="bg-[#0b0f19] border-slate-800"
              >
                <CardHeader className="pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-md bg-slate-800/80 border border-slate-700 text-emerald-400">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-slate-100 font-mono">
                        {catContent.title}
                      </CardTitle>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {catContent.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-4 space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="flex items-center gap-1.5 text-slate-200">
                          {skill.highlight && (
                            <Zap className="w-3 h-3 text-emerald-400" />
                          )}
                          {skill.name}
                        </span>
                        <span className="text-slate-400">{skill.level}%</span>
                      </div>
                      {/* Terminal Progress Bar */}
                      <div className="h-2 w-full rounded-full bg-slate-800/80 overflow-hidden p-0.5 border border-slate-700/40">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
