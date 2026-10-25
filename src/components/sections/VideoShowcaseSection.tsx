"use client";

import * as React from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { MacbookKeyboard } from "@/components/ui/MacbookKeyboard";

interface VideoShowcaseSectionProps {
  locale?: Locale;
  dict: Dictionary;
}

// Media Query External Store Listeners (prevents cascading re-renders)
const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const subscribeMobile = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(max-width: 639px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getMobileSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 639px)").matches;
};

const getServerSnapshot = () => false;

export function VideoShowcaseSection({
  locale,
  dict,
}: VideoShowcaseSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [rawProgress, setRawProgress] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(true);

  // Synchronize system preferences without cascading renders
  const reducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const isMobile = React.useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerSnapshot
  );

  const progress = reducedMotion ? 1 : rawProgress;

  // Track scroll progression smoothly
  React.useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const current = -rect.top;
      const p = Math.max(0, Math.min(1, current / totalScrollable));

      rafId = requestAnimationFrame(() => {
        setRawProgress(p);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafId = requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Toggle audio
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Timeline Mapping:
  // Phase 1 (0.00 -> 0.08): Rest state — Video flush inside laptop screen, heading fully visible
  // Phase 2 (0.08 -> 0.72): Lift & zoom state — Video lifts out of laptop, tilts, scales up, heading fades out
  // Phase 3 (0.72 -> 0.88): Settled state — Video is flat facing user, centered in viewport
  // Phase 4 (0.88 -> 1.00): Exit release — Smooth unpinning into BlogSection
  let animProgress = 0;
  if (progress > 0.08 && progress < 0.72) {
    animProgress = (progress - 0.08) / (0.72 - 0.08);
  } else if (progress >= 0.72) {
    animProgress = 1;
  }

  // Smooth cubic ease-in-out curve
  const easeProgress = animProgress * animProgress * (3 - 2 * animProgress);

  // Interpolated animation values:
  // Scale
  const maxScale = isMobile ? 1.15 : 1.36;
  const currentScale = 1 + (maxScale - 1) * easeProgress;

  // 3D Z elevation (lifts out of the screen lid towards the camera)
  const maxTranslateZ = isMobile ? 70 : 140;
  const currentTranslateZ = maxTranslateZ * easeProgress;

  // Gentle vertical positioning (keeps video comfortably centered in viewport)
  const maxTranslateY = isMobile ? 18 : 34;
  const currentTranslateY = maxTranslateY * easeProgress;

  // 3D forward tilt in intermediate state (peels forward at mid-point, levels flat at final)
  const tiltMax = isMobile ? 10 : 16;
  const currentRotateX = Math.sin(easeProgress * Math.PI) * tiltMax;

  // Dynamic box-shadow that deepens as the video elevates in Z
  const shadowSpread = 15 + 40 * easeProgress;
  const shadowBlur = 25 + 50 * easeProgress;
  const shadowAlpha = 0.5 + 0.45 * easeProgress;
  const glowAlpha = 0.25 * easeProgress;
  const dynamicShadow = `0 ${shadowSpread}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha}), 0 0 35px rgba(16, 185, 129, ${glowAlpha})`;

  // Heading opacity & translation: fades out cleanly as the video lifts off
  const headingOpacity = Math.max(0, 1 - progress * 3.2);
  const headingTranslateY = -progress * 40;

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative h-[240vh] sm:h-[260vh] bg-[#050811] text-white z-10"
    >
      {/* Sticky Fullscreen Presentation Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 select-none">
        {/* Subtle Background Ambience */}
        <div className="absolute inset-0 terminal-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Section Heading: Comfortably spaced above laptop with clear margin to prevent any overlap */}
        <div
          className="text-center z-10 space-y-1 sm:space-y-1.5 mb-5 sm:mb-8 pointer-events-none transition-transform duration-75"
          style={{
            opacity: headingOpacity,
            transform: `translate3d(0, ${headingTranslateY}px, 0)`,
          }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-0.5">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            <span>{dict.videoShowcase.sectionTag}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="block text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.35)]">
              {locale === "bn" ? "সিস্টেম আর্কিটেকচার" : "Full-Stack"}
            </span>
            <span className="block text-white mt-0.5">
              {locale === "bn" ? "ডেভেলপমেন্ট সল্যুশনস" : "Development Solutions"}
            </span>
          </h2>
        </div>

        {/* 3D Laptop Perspective Stage */}
        <div
          className="relative flex flex-col items-center"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* 1. The Screen Lid (Outer chassis with top camera notch and inner recessed well) */}
          <div
            className="relative w-[300px] sm:w-[430px] md:w-[530px] aspect-[16/10] rounded-t-xl sm:rounded-t-2xl bg-[#090a10] border-2 border-[#1c1d29] shadow-2xl p-1.5 sm:p-2 pb-1.5 sm:pb-2 flex flex-col justify-between"
            style={{
              transform: "rotateX(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Top Bezel: Camera Dot & Status Branding */}
            <div className="h-4 sm:h-5 flex items-center justify-between px-2 text-[9px] sm:text-[10px] font-mono text-slate-500 select-none">
              <span className="opacity-0 w-3">sys</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1b1c28] border border-slate-700/60" />
                <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                  Mehedi Hasan
                </span>
              </div>
              <span className="opacity-0 w-3">sys</span>
            </div>

            {/* Inner Screen Display Well (Recessed Screen Surface revealed when video lifts forward) */}
            <div className="w-full flex-1 rounded-md sm:rounded-lg bg-black border border-[#171824] relative overflow-hidden flex flex-col items-center justify-center select-none">
              <div className="absolute inset-0 terminal-grid opacity-15 pointer-events-none" />
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] font-mono text-slate-300 font-medium">Mehedi Hasan</span>
              <span className="text-[9px] font-mono text-slate-500">~/media/showcase.mp4</span>
            </div>

            {/* 2. THE ANIMATED VIDEO OVERLAY (Anchored directly over the Inner Screen Well) */}
            {/* In State 1 (progress = 0), this fits flush with 0 gap inside the screen lid bezels */}
            <div
              className="absolute top-[22px] sm:top-[28px] left-[6px] sm:left-[8px] right-[6px] sm:right-[8px] bottom-[6px] sm:bottom-[8px] z-30 pointer-events-auto rounded-md sm:rounded-lg overflow-hidden border border-slate-700/60 bg-black group"
              style={{
                transform: `translate3d(0, ${currentTranslateY}px, ${currentTranslateZ}px) scale(${currentScale}) rotateX(${currentRotateX}deg)`,
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                boxShadow: dynamicShadow,
              }}
            >
              <video
                ref={videoRef}
                src="/videos/demo-showcase.mp4"
                playsInline
                muted={isMuted}
                autoPlay
                loop
                className="w-full h-full object-cover"
              />

              {/* Floating Quick Mute / Audio Toggle */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                className="absolute top-2.5 right-2.5 z-40 p-1.5 sm:p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/70 backdrop-blur-md transition-all shadow-lg hover:scale-105"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                )}
              </button>

              {/* Status Badge in Initial State */}
              <div
                className="absolute bottom-2.5 left-2.5 z-30 pointer-events-none transition-opacity duration-300"
                style={{ opacity: Math.max(0, 1 - easeProgress * 1.5) }}
              >
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-slate-950/80 border border-slate-800 text-emerald-300 text-[9px] sm:text-[10px] font-mono backdrop-blur-sm">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                  <span>Demo Walkthrough</span>
                </span>
              </div>
            </div>
          </div>

          {/* 3. Laptop Keyboard Chassis Base (Physical keyboard deck in 3D perspective) */}
          <div
            className="w-[320px] sm:w-[460px] md:w-[570px] h-[110px] sm:h-[150px] md:h-[180px] rounded-b-xl sm:rounded-b-2xl bg-gradient-to-b from-[#14151f] via-[#0f1016] to-[#0a0b10] border border-[#222434] p-1.5 sm:p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between relative z-10 pointer-events-none"
            style={{
              transform: "rotateX(55deg)",
              transformOrigin: "top center",
            }}
          >
            {/* Display Hinge Cutout */}
            <div className="w-20 sm:w-32 h-1 sm:h-1.5 rounded-b bg-[#08080c] mx-auto mb-0.5 border-b border-[#20212d]" />

            {/* Recessed Keyboard Well */}
            <div className="w-full flex-1 rounded-lg bg-[#06070a] border border-[#1a1b26] p-1 sm:p-1.5 shadow-inner overflow-hidden">
              <MacbookKeyboard />
            </div>

            {/* Trackpad Area */}
            <div className="w-20 sm:w-32 md:w-40 h-6 sm:h-9 md:h-11 rounded-md bg-[#0c0d14] border border-[#20212f] mx-auto mt-1 shadow-inner" />

            {/* Front Lip Opening Notch */}
            <div className="w-10 sm:w-14 h-0.5 rounded-full bg-[#1c1d2a] mx-auto mt-0.5" />
          </div>
        </div>
      </div>
    </section>
  );
}
