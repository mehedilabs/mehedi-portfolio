"use client";

import * as React from "react";
import {
  Layout,
  Server,
  Wrench,
  GitBranch,
  Terminal,
  Cloud,
  Send,
} from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
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

interface SkillsSectionProps {
  locale?: Locale;
  dict: Dictionary;
}

export function SkillsSection({ locale, dict }: SkillsSectionProps) {
  const skillGroups = [
    {
      id: "frontend",
      title: locale === "bn" ? "ফ্রন্টএন্ড" : "Frontend",
      icon: Layout,
      skills: [
        { name: "Next.js", icon: <NextjsLogo className="w-5 h-5 shrink-0" /> },
        { name: "React", icon: <ReactLogo className="w-5 h-5 shrink-0" /> },
        { name: "TypeScript", icon: <TypeScriptLogo className="w-5 h-5 shrink-0" /> },
        { name: "Tailwind CSS", icon: <TailwindLogo className="w-5 h-5 shrink-0" /> },
        { name: "JavaScript", icon: <Terminal className="w-5 h-5 text-amber-400 shrink-0" /> },
        { name: "HTML5 & CSS3", icon: <Layout className="w-5 h-5 text-cyan-400 shrink-0" /> },
      ],
    },
    {
      id: "backend",
      title: locale === "bn" ? "ব্যাকএন্ড ও ডেটাবেজ" : "Backend & Database",
      icon: Server,
      skills: [
        { name: "Node.js", icon: <NodeLogo className="w-5 h-5 shrink-0" /> },
        { name: "Express.js", icon: <ExpressLogo className="w-5 h-5 shrink-0" /> },
        { name: "MongoDB", icon: <MongoLogo className="w-5 h-5 shrink-0" /> },
        { name: "PostgreSQL", icon: <PostgresLogo className="w-5 h-5 shrink-0" /> },
        { name: "Redis", icon: <RedisLogo className="w-5 h-5 shrink-0" /> },
        { name: "RESTful APIs", icon: <Server className="w-5 h-5 text-emerald-400 shrink-0" /> },
      ],
    },
    {
      id: "tools",
      title: locale === "bn" ? "টুলস ও প্ল্যাটফর্ম" : "Tools & Platforms",
      icon: Wrench,
      skills: [
        { name: "Docker", icon: <DockerLogo className="w-5 h-5 shrink-0" /> },
        { name: "Git & GitHub", icon: <GitBranch className="w-5 h-5 text-emerald-400 shrink-0" /> },
        { name: "Postman", icon: <Send className="w-5 h-5 text-orange-400 shrink-0" /> },
        { name: "VS Code", icon: <Terminal className="w-5 h-5 text-cyan-400 shrink-0" /> },
        { name: "Linux / Nginx", icon: <Terminal className="w-5 h-5 text-slate-300 shrink-0" /> },
        { name: "Vercel / Cloud", icon: <Cloud className="w-5 h-5 text-sky-400 shrink-0" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 border-t border-slate-900 bg-[#080b12]/50 relative">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            <span>{dict.skills.sectionTag}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {dict.skills.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            {dict.skills.subtitle}
          </p>
        </div>

        {/* 3 Simple, Clean Groups (Frontend, Backend & Database, Tools) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {skillGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div
                key={group.id}
                className="rounded-2xl border border-slate-800 bg-[#0c101a] p-6 space-y-5 shadow-lg flex flex-col justify-between"
              >
                {/* Group Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <GroupIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">
                    {group.title}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 gap-2.5 flex-1">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/70 hover:border-slate-700 hover:bg-slate-900 transition-colors"
                    >
                      {skill.icon}
                      <span className="text-sm font-medium text-slate-200">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
