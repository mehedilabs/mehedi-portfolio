"use client";

import * as React from "react";
import { Laptop, ArrowRight } from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Button } from "@/components/ui/Button";
import { PublicProfileData } from "@/lib/api-client";

interface AboutSectionProps {
  locale?: Locale;
  dict: Dictionary;
  profile?: PublicProfileData | null;
  sectionTag?: string;
}

// Visual illustration showing a developer working at a computer/laptop
function DeveloperWorkingIllustration() {
  return (
    <svg
      viewBox="0 0 380 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-contain select-none"
      aria-hidden="true"
    >
      {/* Background ambient lighting */}
      <circle cx="190" cy="130" r="90" fill="#10b981" fillOpacity="0.08" />
      <circle cx="230" cy="110" r="70" fill="#06b6d4" fillOpacity="0.06" />

      {/* Desk surface */}
      <rect x="30" y="230" width="320" height="8" rx="4" fill="#1e293b" />
      <rect x="55" y="238" width="6" height="55" rx="2" fill="#0f172a" />
      <rect x="319" y="238" width="6" height="55" rx="2" fill="#0f172a" />

      {/* Warm Coffee Mug on Desk */}
      <rect x="55" y="212" width="14" height="18" rx="2.5" fill="#334155" />
      <path
        d="M69 216 C74 216, 74 224, 69 224"
        stroke="#475569"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M60 206 Q63 202, 61 198"
        stroke="#10b981"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Laptop Base on Desk */}
      <path
        d="M105 226 L225 226 L218 230 L112 230 Z"
        fill="#334155"
        stroke="#475569"
        strokeWidth="1.2"
      />

      {/* Laptop Screen with Code Editor Lines */}
      <rect
        x="115"
        y="142"
        width="100"
        height="84"
        rx="6"
        fill="#090d16"
        stroke="#334155"
        strokeWidth="1.8"
      />
      <rect x="122" y="150" width="86" height="68" rx="3" fill="#050811" />
      {/* Window Controls */}
      <circle cx="129" cy="156" r="2" fill="#ef4444" />
      <circle cx="135" cy="156" r="2" fill="#f59e0b" />
      <circle cx="141" cy="156" r="2" fill="#10b981" />
      {/* Code Syntax Lines */}
      <rect x="128" y="165" width="34" height="2.5" rx="1.2" fill="#10b981" />
      <rect x="128" y="172" width="54" height="2.5" rx="1.2" fill="#38bdf8" />
      <rect x="134" y="179" width="42" height="2.5" rx="1.2" fill="#94a3b8" />
      <rect x="134" y="186" width="28" height="2.5" rx="1.2" fill="#10b981" />
      <rect x="128" y="193" width="38" height="2.5" rx="1.2" fill="#38bdf8" />
      <rect x="128" y="200" width="48" height="2.5" rx="1.2" fill="#a78bfa" />

      {/* Ergonomic Office Chair */}
      <rect x="238" y="155" width="8" height="75" rx="4" fill="#1e293b" />
      <path d="M234 230 L252 230" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <rect x="241" y="230" width="5" height="62" fill="#0f172a" />

      {/* Seated Developer Body */}
      <path
        d="M214 168 Q230 164, 238 178 L238 230 L202 230 Q204 192, 214 168 Z"
        fill="#1e293b"
      />

      {/* Head & Hair */}
      <circle cx="222" cy="136" r="15" fill="#334155" />
      <path
        d="M210 132 C210 120, 234 120, 235 132"
        fill="#10b981"
        fillOpacity="0.8"
      />

      {/* Headphones */}
      <path
        d="M208 135 C206 128, 211 122, 222 122 C233 122, 238 128, 236 135"
        stroke="#10b981"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="207" y="133" width="3.5" height="9" rx="1.5" fill="#10b981" />
      <rect x="234" y="133" width="3.5" height="9" rx="1.5" fill="#10b981" />

      {/* Typing Arms reaching toward keyboard */}
      <path
        d="M218 182 Q198 196, 180 216 L196 218 Q210 203, 228 190 Z"
        fill="#334155"
      />
      <circle cx="178" cy="216" r="4.5" fill="#475569" />

      {/* Floating Syntax Elements */}
      <g opacity="0.35">
        <text
          x="270"
          y="110"
          fill="#10b981"
          fontSize="14"
          fontFamily="monospace"
        >
          {"</>"}
        </text>
        <text
          x="55"
          y="125"
          fill="#38bdf8"
          fontSize="13"
          fontFamily="monospace"
        >
          {"{ }"}
        </text>
      </g>
    </svg>
  );
}

export function AboutSection({ locale = "en", dict, profile, sectionTag }: AboutSectionProps) {
  const isBn = locale === "bn";
  const localizedProfile = isBn ? profile?.bn : profile?.en;

  const displayTag = sectionTag || dict.about.sectionTag;
  const title = localizedProfile?.aboutTitle || dict.about.title;
  const headline = localizedProfile?.aboutHeadline || (isBn
    ? "পরিচ্ছন্ন, আধুনিক ও ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন নির্মাণে নিবেদিত।"
    : "Building clean, modern, and user-friendly web applications.");

  const paragraphs = localizedProfile?.aboutParagraphs && localizedProfile.aboutParagraphs.length > 0
    ? localizedProfile.aboutParagraphs
    : [dict.about.bioParagraph1, dict.about.bioParagraph2, dict.about.bioParagraph3];

  const aboutPhotoUrl = profile?.aboutPhotoUrl || "";
  const aboutPhotoAlt = profile?.aboutPhotoAlt || (isBn ? "মেহেদী হাসান — কর্মক্ষেত্র" : "Mehedi Hasan — Developer Workspace");
  const [photoError, setPhotoError] = React.useState(false);

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
    <section id="about" className="py-16 sm:py-24 border-t border-slate-200 dark:border-slate-900 relative transition-colors">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            <span>{displayTag}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h2>
        </div>

        {/* Balanced Two-Column Layout (Desktop) / Natural Stack (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Column 1: Separate Developer-At-Work Image / Illustration */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/3] sm:aspect-square rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c101a] p-4 sm:p-5 shadow-2xl flex flex-col items-center justify-between overflow-hidden group transition-colors">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-cyan-500/10 opacity-60 pointer-events-none" />
              <div className="absolute inset-0 terminal-grid opacity-20 pointer-events-none" />

              {/* Developer Workspace Image or Illustration */}
              <div className="relative z-10 w-full flex-1 flex items-center justify-center p-2 group-hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
                {aboutPhotoUrl && !photoError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={aboutPhotoUrl}
                    alt={aboutPhotoAlt}
                    onError={() => setPhotoError(true)}
                    className="w-full h-full object-cover rounded-xl shadow-md"
                  />
                ) : (
                  <DeveloperWorkingIllustration />
                )}
              </div>

              {/* Separate Developer Workspace Caption */}
              <div className="relative z-10 w-full pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-slate-800 dark:text-slate-300 font-medium">
                    {isBn ? "ডেভেলপমেন্ট স্পেস" : "Developer at Work"}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400/90 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded font-medium">
                  Coding & Building
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Concise, Friendly Introduction */}
          <div className="md:col-span-7 space-y-5 text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
              {headline}
            </h3>

            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base lg:text-[17px] leading-relaxed">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Core Technologies Pills */}
            <div className="pt-2 space-y-2">
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                {isBn ? "প্রধান প্রযুক্তিসমূহ:" : "Primary Technologies:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300"
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
