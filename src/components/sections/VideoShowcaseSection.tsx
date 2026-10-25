"use client";

import * as React from "react";
import {
  Play,
  Video,
  Clock,
  Sparkles,
  X,
  Terminal,
} from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Button } from "@/components/ui/Button";

interface VideoShowcaseSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function VideoShowcaseSection({
  locale,
  dict,
}: VideoShowcaseSectionProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Configurable video data structure (ready for future Phase 2 Admin Panel CMS integration)
  const videoConfig = {
    title: dict.videoShowcase.videoTitle,
    description: dict.videoShowcase.videoDesc,
    duration: dict.videoShowcase.duration,
    category: dict.videoShowcase.category,
    // Real video URL placeholder (honest placeholder as requested; no fake link)
    videoUrl: "",
    thumbnail: "/images/video/architecture-thumbnail.png",
    chapters: [
      {
        timestamp: "00:00",
        title: locale === "bn" ? "ভূমিকা ও আর্কিটেকচার ওভারভিউ" : "Introduction & Monorepo Overview",
      },
      {
        timestamp: "03:45",
        title: locale === "bn" ? "Next.js ১৬ ও দ্বিভাষিক রাউটিং" : "Next.js 16 App Router & Bilingual Setup",
      },
      {
        timestamp: "07:20",
        title: locale === "bn" ? "Express REST API ও MongoDB পুলিং" : "Express.js REST Gateway & MongoDB Pooling",
      },
      {
        timestamp: "10:15",
        title: locale === "bn" ? "ডকার কন্টেইনার ও ক্লাউড ডেপ্লয়মেন্ট" : "Docker Containers & Cloud Deployment",
      },
    ],
  };

  return (
    <section id="showcase" className="py-20 border-t border-slate-900 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {dict.videoShowcase.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {dict.videoShowcase.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-[17px] max-w-3xl leading-relaxed">
            {dict.videoShowcase.subtitle}
          </p>
        </div>

        {/* Video Player Showcase Card (Mihir Das Inspired) */}
        <div className="rounded-2xl border border-slate-800 bg-[#0c101a] shadow-2xl overflow-hidden group">
          {/* Window Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">~/media/architecture-walkthrough.mp4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono">
                {videoConfig.category}
              </span>
            </div>
          </div>

          {/* Interactive Video Stage / Canvas */}
          <div className="relative aspect-video max-h-[540px] w-full bg-gradient-to-br from-[#0c121e] via-[#090d16] to-[#070a10] overflow-hidden flex items-center justify-center">
            {/* Background Grid & Texture */}
            <div className="absolute inset-0 terminal-grid opacity-30 pointer-events-none" />

            {/* Stage Graphic Elements */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-emerald-400 text-xs font-mono backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Walkthrough</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-300 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{videoConfig.duration}</span>
                </span>
              </div>

              {/* Bottom Video Meta Description */}
              <div className="space-y-1.5 max-w-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-mono drop-shadow-md">
                  {videoConfig.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed drop-shadow">
                  {videoConfig.description}
                </p>
              </div>
            </div>

            {/* Glowing Center Play Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={dict.videoShowcase.watchDemo}
              className="relative z-20 group/play flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-emerald-400/80 bg-emerald-950/60 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.35)] hover:scale-110 hover:border-emerald-300 hover:bg-emerald-900/60 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/40 opacity-50 pointer-events-none" />
              <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-emerald-400 text-emerald-400 ml-1 group-hover/play:scale-110 transition-transform" />
            </button>
          </div>

          {/* Chapters / Key Milestones Bar */}
          <div className="border-t border-slate-800/80 p-5 sm:p-6 bg-slate-950/60">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {videoConfig.chapters.map((chap, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3 hover:border-slate-700 transition-colors flex items-center gap-2.5 font-mono text-xs"
                >
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold text-[11px] shrink-0">
                    {chap.timestamp}
                  </span>
                  <span className="text-slate-300 truncate font-sans text-xs">
                    {chap.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Player Modal Dialog */}
        {isPlaying && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={videoConfig.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div className="relative w-full max-w-4xl rounded-2xl border border-slate-700 bg-[#090d16] shadow-2xl overflow-hidden space-y-4">
              {/* Modal Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 truncate">
                  <Video className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{videoConfig.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlaying(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label={dict.videoShowcase.closeDemo}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Display Container */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  <div className="absolute inset-0 terminal-grid opacity-30 pointer-events-none" />

                  <div className="relative z-10 max-w-md space-y-3">
                    <div className="h-14 w-14 rounded-full border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                      <Terminal className="h-7 w-7" />
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white font-mono">
                      {locale === "bn"
                        ? "আর্কিটেকচার ভিডিও ডেমো প্লেয়ার"
                        : "Architecture Video Walkthrough Player"}
                    </h4>

                    {/* Tasteful and Truthful Notice */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                      {dict.videoShowcase.placeholderNotice}
                    </p>

                    <div className="pt-2 inline-flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Ready for Phase 2 Cloudinary Upload</span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls & Close */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Duration: {videoConfig.duration}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(false)}
                    className="gap-1.5 text-xs text-slate-300"
                  >
                    <span>{dict.videoShowcase.closeDemo}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
