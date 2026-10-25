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

  // Interpolated Animation Values based on the 3 reference states
  // State 1 (progress = 0): Resting inside laptop screen bezel
  // State 2 (progress = 0.5): Lifting forward in Z, scaling up, tilting in 3D perspective
  // State 3 (progress = 1.0): Fully expanded, flat facing camera, positioned in front of keyboard
  const maxScale = isMobile ? 1.15 : 1.58;
  const midScale = isMobile ? 1.06 : 1.25;

  const maxTranslateY = isMobile ? 60 : 125;
  const midTranslateY = isMobile ? 25 : 50;

  const maxTranslateZ = isMobile ? 80 : 160;
  const midTranslateZ = isMobile ? 40 : 80;

  let currentScale = 1;
  let currentTranslateY = 0;
  let currentTranslateZ = 12; // Initial Z elevation guarantees it is in front of the lid
  let currentRotateX = -8;

  if (progress <= 0.5) {
    const localP = progress / 0.5;
    currentScale = 1 + (midScale - 1) * localP;
    currentTranslateY = midTranslateY * localP;
    currentTranslateZ = 12 + (midTranslateZ - 12) * localP;
    currentRotateX = -8 + 28 * localP; // -8deg -> +20deg (tilt forward)
  } else {
    const localP = (progress - 0.5) / 0.5;
    currentScale = midScale + (maxScale - midScale) * localP;
    currentTranslateY = midTranslateY + (maxTranslateY - midTranslateY) * localP;
    currentTranslateZ = midTranslateZ + (maxTranslateZ - midTranslateZ) * localP;
    currentRotateX = 20 - 20 * localP; // +20deg -> 0deg (flat)
  }

  // Heading opacity & translation: fades out cleanly as user scrolls
  const headingOpacity = Math.max(0, 1 - progress * 2.8);
  const headingTranslateY = -progress * 100;

  const isFinalState = progress > 0.85;

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative h-[220vh] sm:h-[260vh] bg-[#050811] text-white"
    >
      {/* Sticky Fullscreen Presentation Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Subtle Background Ambience */}
        <div className="absolute inset-0 terminal-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Section Heading: Placed with generous spacing above laptop so it NEVER overlaps in State 1 */}
        <div
          className="text-center z-10 space-y-1 sm:space-y-2 mb-6 sm:mb-10 pointer-events-none transition-transform duration-75"
          style={{
            opacity: headingOpacity,
            transform: `translate3d(0, ${headingTranslateY}px, 0)`,
          }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            <span>{dict.videoShowcase.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="block text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.35)]">
              {locale === "bn" ? "সিস্টেম আর্কিটেকচার" : "Full-Stack"}
            </span>
            <span className="block text-white mt-0.5 sm:mt-1">
              {locale === "bn" ? "ডেভেলপমেন্ট সল্যুশনস" : "Development Solutions"}
            </span>
          </h2>
        </div>

        {/* 3D Laptop Perspective Stage */}
        <div
          className="relative flex flex-col items-center justify-center"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Layer 1: Laptop Body (Lid Backing + Base Keyboard Chassis) — Lower Stacking Order */}
          <div
            className="relative flex flex-col items-center z-10 pointer-events-none select-none transition-transform duration-75"
            style={{
              transform: "rotateX(20deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Laptop Lid Screen Backing (Frame where video initially lives) */}
            <div className="relative w-[306px] sm:w-[474px] md:w-[594px] aspect-[16/10] rounded-t-2xl bg-[#090a0f] border-2 border-[#1c1d27] p-2 sm:p-2.5 pb-2 flex flex-col justify-between shadow-2xl">
              {/* Top Bezel with Camera dot & Branding */}
              <div className="flex items-center justify-between px-2 py-0.5 text-[10px] font-mono text-slate-500">
                <span className="opacity-0">sys</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#202230]" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    Mehedi Hasan
                  </span>
                </div>
                <span className="opacity-0">sys</span>
              </div>

              {/* Inside Screen Well (Recessed Surface revealed when video lifts forward) */}
              <div className="w-full flex-1 rounded-lg bg-black border border-[#1b1c26] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 terminal-grid opacity-15 pointer-events-none" />
                <span className="text-[11px] font-mono text-slate-600">
                  ~/media/showcase.mp4
                </span>
              </div>
            </div>

            {/* Laptop Keyboard Chassis Base (Physical keyboard deck) */}
            <div className="w-[326px] sm:w-[504px] md:w-[634px] h-[145px] sm:h-[205px] md:h-[250px] rounded-b-2xl sm:rounded-b-[24px] bg-gradient-to-b from-[#14151c] via-[#0f1016] to-[#0a0b10] border border-[#222432] p-2 sm:p-3 shadow-[0_25px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between relative z-10">
              {/* Display Hinge Cutout */}
              <div className="w-24 sm:w-36 h-1.5 sm:h-2 rounded-b-md bg-[#08080c] mx-auto mb-1 border-b border-[#1f202b]" />

              {/* Recessed Keyboard Well */}
              <div className="w-full flex-1 rounded-xl bg-[#06070a] border border-[#1a1b24] p-1.5 sm:p-2 shadow-inner">
                <MacbookKeyboard />
              </div>

              {/* Trackpad Area */}
              <div className="w-24 sm:w-36 md:w-44 h-9 sm:h-14 md:h-16 rounded-lg bg-[#0c0d13] border border-[#20212d] mx-auto mt-1.5 shadow-inner" />

              {/* Front Lip Opening Notch */}
              <div className="w-12 sm:w-16 h-1 rounded-full bg-[#1c1d29] mx-auto mt-1" />
            </div>
          </div>

          {/* Layer 2: EXACTLY ONE ANIMATED VIDEO ELEMENT (Higher Z & translateZ — NEVER covered by keyboard!) */}
          <div
            className="absolute top-0 z-50 flex items-center justify-center pointer-events-auto w-[302px] sm:w-[470px] md:w-[590px] aspect-[16/10]"
            style={{
              transform: `translate3d(0, ${currentTranslateY}px, ${currentTranslateZ}px) scale(${currentScale}) rotateX(${currentRotateX}deg)`,
              transformStyle: "preserve-3d",
              transition: "box-shadow 0.2s ease",
              boxShadow: isFinalState
                ? "0 35px 80px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(16, 185, 129, 0.25)"
                : "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
            }}
          >
            <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/80 bg-black group shadow-2xl">
              <video
                ref={videoRef}
                src="/videos/demo-showcase.mp4"
                playsInline
                muted={isMuted}
                autoPlay
                loop
                controls={isFinalState}
                className="w-full h-full object-cover"
              />

              {/* Floating Quick Mute / Audio Toggle */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                className="absolute top-3 right-3 z-50 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/70 backdrop-blur-md transition-all shadow-lg hover:scale-105"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-slate-300" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                )}
              </button>

              {/* Status Badge in Initial State */}
              {!isFinalState && (
                <div className="absolute bottom-3 left-3 z-40 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-emerald-300 text-[10px] font-mono backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>Demo Walkthrough</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
