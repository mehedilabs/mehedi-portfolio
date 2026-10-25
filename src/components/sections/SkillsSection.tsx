"use client";

import * as React from "react";
import {
  Layout,
  Server,
  Database,
  Cloud,
  Layers,
  Terminal,
  Activity,
  GitBranch,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Search,
  HardDrive,
} from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { SKILL_CATEGORIES } from "@/data/portfolio-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  ReactLogo,
  NextjsLogo,
  TypeScriptLogo,
  TailwindLogo,
  NodeLogo,
  ExpressLogo,
  MongoLogo,
  PostgresLogo,
  RedisLogo,
  DockerLogo,
} from "@/components/ui/Icons";
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

  const getTechIcon = (name: string, iconName: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("react")) return <ReactLogo className="w-5 h-5 shrink-0" />;
    if (lowerName.includes("next")) return <NextjsLogo className="w-5 h-5 shrink-0" />;
    if (lowerName.includes("typescript")) return <TypeScriptLogo className="w-5 h-5 shrink-0" />;
    if (lowerName.includes("tailwind")) return <TailwindLogo className="w-5 h-5 shrink-0" />;
    if (lowerName.includes("node")) return <NodeLogo className="w-5 h-5 shrink-0" />;
    if (lowerName.includes("express")) return <ExpressLogo className="w-5 h-5 shrink-0" />;
    if (lowerName.includes("mongo")) return <MongoLogo className="w-5 h-5 shrink-0" />;
    if (lowerName.includes("postgres")) return <PostgresLogo className="w-5 h-5 shrink-0" />;
    if (lowerName.includes("redis")) return <RedisLogo className="w-5 h-5 shrink-0" />;
    if (lowerName.includes("docker")) return <DockerLogo className="w-5 h-5 shrink-0" />;

    // Lucide Icon Fallbacks based on iconName
    switch (iconName) {
      case "Layers":
        return <Layers className="w-5 h-5 text-indigo-400 shrink-0" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-amber-400 shrink-0" />;
      case "Shield":
      case "CheckCircle":
        return <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-cyan-400 shrink-0" />;
      case "Lock":
        return <Lock className="w-5 h-5 text-rose-400 shrink-0" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-emerald-400 shrink-0" />;
      case "Search":
        return <Search className="w-5 h-5 text-amber-400 shrink-0" />;
      case "HardDrive":
        return <HardDrive className="w-5 h-5 text-slate-400 shrink-0" />;
      case "GitBranch":
        return <GitBranch className="w-5 h-5 text-emerald-400 shrink-0" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-cyan-400 shrink-0" />;
      default:
        return <Terminal className="w-5 h-5 text-emerald-400 shrink-0" />;
    }
  };

  const filteredCategories =
    activeTab === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeTab);

  const totalSkillsCount = SKILL_CATEGORIES.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  return (
    <section id="skills" className="py-20 border-t border-slate-900 bg-[#080b12]/50 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {dict.skills.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {dict.skills.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-[17px] max-w-3xl leading-relaxed">
            {dict.skills.subtitle}
          </p>
        </div>

        {/* Clean Interactive Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex flex-wrap items-center gap-2" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all",
                activeTab === "all"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                  : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <span>{dict.skills.allCompetencies}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                {totalSkillsCount}
              </span>
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
                    "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all",
                    isSelected
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                      : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"
                  )}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{title}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
                    {cat.skills.length}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-slate-400 hidden sm:block">
            <span className="text-emerald-400 font-semibold">•</span> {dict.skills.proficiencyLegend}
          </div>
        </div>

        {/* Organized Clean Skill Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category) => {
            const IconComp = categoryIcons[category.id] || Terminal;
            const catContent = locale === "bn" ? category.bn : category.en;

            return (
              <Card
                key={category.id}
                glow="emerald"
                className="bg-[#0c101a] border-slate-800 shadow-xl overflow-hidden"
              >
                {/* Category Header */}
                <CardHeader className="p-5 sm:p-6 pb-4 border-b border-slate-800/80 bg-slate-900/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-emerald-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg sm:text-xl font-bold text-white font-mono">
                          {catContent.title}
                        </CardTitle>
                        <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-sans">
                          {catContent.description}
                        </p>
                      </div>
                    </div>

                    <Badge variant="terminal" className="text-[11px] self-start sm:self-center">
                      {category.skills.length} Technologies
                    </Badge>
                  </div>
                </CardHeader>

                {/* Clean Professional Technology Cards Grid (Zero Clutter, No Fake % Bars) */}
                <CardContent className="p-5 sm:p-6 pt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="rounded-xl border border-slate-800/90 bg-[#090d16] p-3.5 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-200 flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            {getTechIcon(skill.name, skill.iconName)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-slate-200 truncate group-hover:text-emerald-300 transition-colors">
                              {skill.name}
                            </p>
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                              {skill.highlight ? "Core Architecture" : "Production"}
                            </span>
                          </div>
                        </div>

                        {skill.highlight && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        )}
                      </div>
                    ))}
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
