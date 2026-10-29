"use client";

import * as React from "react";
import { ArrowRight, Mail, FileText, User, ExternalLink, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { CONTACT_INFO } from "@/data/portfolio-data";
import { Button } from "@/components/ui/Button";
import { PublicProfileData } from "@/lib/api-client";

interface HeroSectionProps {
  locale?: Locale;
  dict: Dictionary;
  profile?: PublicProfileData | null;
  resumeUrl?: string;
}

export function HeroSection({ locale = "en", dict, profile, resumeUrl }: HeroSectionProps) {
  const isBn = locale === "bn";
  const localizedProfile = isBn ? profile?.bn : profile?.en;

  const greeting = localizedProfile?.greeting || dict.hero.greeting;
  const name = profile?.name || dict.hero.name;
  const title = localizedProfile?.title || dict.hero.title;
  const summary = localizedProfile?.summary || localizedProfile?.bio || dict.hero.summary;
  const availabilityBadge = profile?.availabilityText || dict.hero.badge;

  const effectiveResumeUrl = profile?.resumeUrl || resumeUrl || "";
  const hasResume = Boolean(effectiveResumeUrl && effectiveResumeUrl.trim() !== "");

  const avatarUrl = profile?.avatarUrl || "/images/hero-profile.png";
  const avatarAlt = profile?.avatarAlt || `${name} — Professional Profile`;

  const [imageError, setImageError] = React.useState(false);

  const socialGithub = profile?.socialLinks?.github || CONTACT_INFO.github;
  const socialLinkedin = profile?.socialLinks?.linkedin || CONTACT_INFO.linkedin;
  const socialTwitter = profile?.socialLinks?.twitter || CONTACT_INFO.twitter;
  const socialEmail = profile?.email || CONTACT_INFO.email;

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Subtle Terminal Background Grids & Ambience */}
      <div className="absolute inset-0 terminal-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Greeting, Name, Role, Intro, Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-mono text-emerald-400 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{availabilityBadge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-mono text-slate-500 dark:text-slate-400 font-medium">
                {greeting}
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {name}
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                {title}
              </h2>
            </div>

            {/* Short, Friendly Introduction */}
            <p className="text-base sm:text-lg lg:text-[18px] text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
              {summary}
            </p>

            {/* Clear Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#projects">
                <Button variant="default" size="lg" className="gap-2 text-sm sm:text-base h-11 px-6 shadow-md shadow-emerald-500/20">
                  <span>{dict.hero.ctaPrimary}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>

              <a href="#contact">
                <Button variant="terminal" size="lg" className="gap-2 text-sm sm:text-base h-11 px-6">
                  <Mail className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <span>{dict.hero.ctaSecondary}</span>
                </Button>
              </a>

              {/* Dynamic Resume Action Button */}
              {hasResume && (
                <div className="inline-flex items-center rounded-lg border border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-0.5 shadow-sm">
                  <a
                    href={effectiveResumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-medium px-4 py-2.5 text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    title={isBn ? "ব্রাউজারে রেজ্যুমে দেখুন" : "View Resume in browser"}
                  >
                    <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{dict.hero.ctaResume}</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                  <span className="w-px h-5 bg-slate-200 dark:bg-slate-800" />
                  <a
                    href={effectiveResumeUrl}
                    download
                    className="p-2 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                    title={isBn ? "রেজ্যুমে ডাউনলোড করুন" : "Download Resume PDF"}
                    aria-label="Download Resume PDF"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Social Reachout Links */}
            <div className="flex items-center gap-4 pt-3 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-slate-400 dark:text-slate-500">Connect:</span>
              {socialGithub && (
                <a
                  href={socialGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              )}
              {socialLinkedin && (
                <>
                  <span className="text-slate-300 dark:text-slate-700">/</span>
                  <a
                    href={socialLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-700 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                </>
              )}
              {socialTwitter && (
                <>
                  <span className="text-slate-300 dark:text-slate-700">/</span>
                  <a
                    href={socialTwitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-700 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <TwitterIcon className="h-4 w-4" />
                    <span>Twitter</span>
                  </a>
                </>
              )}
              {socialEmail && (
                <>
                  <span className="text-slate-300 dark:text-slate-700">/</span>
                  <a
                    href={`mailto:${socialEmail}`}
                    className="flex items-center gap-1.5 text-slate-700 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Theme-Adaptive Profile Photo Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 group">
              {/* Theme-aware ambient glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/25 via-cyan-500/20 to-emerald-500/25 dark:from-emerald-500/40 dark:via-cyan-500/30 dark:to-emerald-500/40 blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Main Card Frame */}
              <div className="relative h-full w-full rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 sm:p-3 shadow-2xl overflow-hidden transition-colors">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center border border-slate-200/80 dark:border-slate-800/80">
                  {/* Photo Rendering with fallback */}
                  {avatarUrl && !imageError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt={avatarAlt}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-emerald-500/60 bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-lg mb-3">
                        <User className="h-12 w-12 sm:h-14 sm:w-14" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 font-mono">
                        {name}
                      </h3>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                        {title}
                      </p>
                    </div>
                  )}

                  {/* Corner Location Badge */}
                  <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-white border border-emerald-500/40 text-[11px] font-mono shadow-md backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    <span>{dict.site.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
