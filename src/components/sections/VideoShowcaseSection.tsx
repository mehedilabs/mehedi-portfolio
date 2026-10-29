"use client";

import * as React from "react";
import { Volume2, Volume1, VolumeX, Play, Pause, Video } from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { MacbookKeyboard } from "@/components/ui/MacbookKeyboard";

export interface VideoShowcaseConfig {
  videoSourceType?: "google-drive" | "native-url";
  googleDriveSharingUrl?: string;
  googleDriveFileId?: string;
  videoUrl?: string;
  posterUrl?: string;
  en?: {
    badge?: string;
    headingHighlight?: string;
    headingNormal?: string;
    subheading?: string;
  };
  bn?: {
    badge?: string;
    headingHighlight?: string;
    headingNormal?: string;
    subheading?: string;
  };
}

interface VideoShowcaseSectionProps {
  locale?: Locale;
  dict: Dictionary;
  config?: VideoShowcaseConfig;
}

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const subscribeMobile = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia("(max-width: 639px)");

  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
};

const getMobileSnapshot = () => {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(max-width: 639px)").matches;
};

const getServerSnapshot = () => false;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function VideoShowcaseSection({
  locale,
  dict,
  config,
}: VideoShowcaseSectionProps) {
  const isGoogleDrive =
    config?.videoSourceType === "google-drive" && Boolean(config?.googleDriveFileId);
  const isNative =
    config?.videoSourceType === "native-url" &&
    Boolean(config?.videoUrl) &&
    config.videoUrl !== "/videos/demo-showcase.mp4";
  const [sourceError, setSourceError] = React.useState(false);
  const videoSrc = isNative ? config?.videoUrl || "" : "";

  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const rafRef = React.useRef<number | null>(null);

  const [rawProgress, setRawProgress] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const reducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot,
  );

  const isMobile = React.useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerSnapshot,
  );

  const progress = reducedMotion ? 1 : rawProgress;

  React.useEffect(() => {
    let lastProgress = -1;

    const handleScroll = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;

        if (!container) return;

        const rect = container.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;

        if (totalScrollable <= 0) return;

        const current = -rect.top;
        const nextProgress = Math.max(
          0,
          Math.min(1, current / totalScrollable),
        );

        if (Math.abs(nextProgress - lastProgress) > 0.001) {
          lastProgress = nextProgress;
          setRawProgress(nextProgress);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const syncVideoState = React.useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    setCurrentTime(video.currentTime || 0);

    if (Number.isFinite(video.duration)) {
      setDuration(video.duration);
    } else {
      setDuration(0);
    }

    setIsPlaying(!video.paused && !video.ended);
    setIsMuted(video.muted);
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) return;

    setCurrentTime(video.currentTime || 0);
  };

  const handleLoadedMetadata = () => {
    syncVideoState();
  };

  const handleDurationChange = () => {
    const video = videoRef.current;

    if (!video) return;

    setDuration(Number.isFinite(video.duration) ? video.duration : 0);
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleEnded = () => {
    setIsPlaying(false);
    syncVideoState();
  };

  const togglePlayPause = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();

    const video = videoRef.current;

    if (!video) return;

    if (video.muted) {
      video.muted = false;

      if (video.volume === 0) {
        video.volume = 0.8;
        setVolume(0.8);
      }

      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const video = videoRef.current;
    const newVolume = Number(e.target.value);

    setVolume(newVolume);

    if (!video) return;

    video.volume = newVolume;
    video.muted = newVolume === 0;

    setIsMuted(video.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration)) return;

    const nextTime = Math.max(
      0,
      Math.min(video.duration, Number(e.target.value)),
    );

    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  let animProgress = 0;

  if (progress > 0.08 && progress < 0.72) {
    animProgress = (progress - 0.08) / (0.72 - 0.08);
  } else if (progress >= 0.72) {
    animProgress = 1;
  }

  const easeProgress = animProgress * animProgress * (3 - 2 * animProgress);

  const maxScale = isMobile ? 1.15 : 1.36;
  const currentScale = 1 + (maxScale - 1) * easeProgress;

  const maxTranslateZ = isMobile ? 70 : 140;
  const currentTranslateZ = maxTranslateZ * easeProgress;

  const maxTranslateY = isMobile ? 18 : 34;
  const currentTranslateY = maxTranslateY * easeProgress;

  const tiltMax = isMobile ? 10 : 16;
  const currentRotateX = Math.sin(easeProgress * Math.PI) * tiltMax;

  const shadowSpread = 15 + 40 * easeProgress;
  const shadowBlur = 25 + 50 * easeProgress;
  const shadowAlpha = 0.5 + 0.45 * easeProgress;
  const glowAlpha = 0.25 * easeProgress;

  const dynamicShadow = `0 ${shadowSpread}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha}), 0 0 35px rgba(16, 185, 129, ${glowAlpha})`;

  const headingOpacity = Math.max(0, 1 - progress * 3.2);
  const headingTranslateY = -progress * 40;

  const playbackProgress =
    duration > 0
      ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
      : 0;

  const displayedVolume = isMuted ? 0 : volume;

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative h-[240vh] sm:h-[260vh] bg-[#050811] text-white z-10"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 select-none">
        <div className="absolute inset-0 terminal-grid opacity-20 pointer-events-none" />

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div
          className="text-center z-10 space-y-1 sm:space-y-1.5 mb-5 sm:mb-8 pointer-events-none transition-transform duration-75"
          style={{
            opacity: headingOpacity,
            transform: `translate3d(0, ${headingTranslateY}px, 0)`,
          }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-0.5">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            <span>
              {config?.[locale === "bn" ? "bn" : "en"]?.badge ||
                dict.videoShowcase.sectionTag}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="block text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.35)]">
              {config?.[locale === "bn" ? "bn" : "en"]?.headingHighlight ||
                (locale === "bn" ? "সিস্টেম আর্কিটেকচার" : "Full-Stack")}
            </span>

            <span className="block text-white mt-0.5">
              {config?.[locale === "bn" ? "bn" : "en"]?.headingNormal ||
                (locale === "bn"
                  ? "ডেভেলপমেন্ট সল্যুশনস"
                  : "Development Solutions")}
            </span>
          </h2>

          {config?.[locale === "bn" ? "bn" : "en"]?.subheading && (
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-2">
              {config[locale === "bn" ? "bn" : "en"]?.subheading}
            </p>
          )}
        </div>

        <div
          className="relative flex flex-col items-center"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="relative w-[300px] sm:w-[430px] md:w-[530px] aspect-[16/10] rounded-t-xl sm:rounded-t-2xl bg-[#090a10] border-2 border-[#1c1d29] shadow-2xl p-1.5 sm:p-2 pb-1.5 sm:pb-2 flex flex-col justify-between"
            style={{
              transform: "rotateX(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
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

            <div className="w-full flex-1 rounded-md sm:rounded-lg bg-black border border-[#171824] relative overflow-hidden flex flex-col items-center justify-center select-none">
              <div className="absolute inset-0 terminal-grid opacity-15 pointer-events-none" />

              <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              <span className="text-[11px] font-mono text-slate-300 font-medium">
                Mehedi Hasan
              </span>

              <span className="text-[9px] font-mono text-slate-500">
                ~/media/showcase.mp4
              </span>
            </div>

            <div
              className="absolute top-[22px] sm:top-[28px] left-[6px] sm:left-[8px] right-[6px] sm:right-[8px] bottom-[6px] sm:bottom-[8px] z-30 pointer-events-auto rounded-md sm:rounded-lg overflow-hidden border border-slate-700/60 bg-black group"
              style={{
                transform: `translate3d(0, ${currentTranslateY}px, ${currentTranslateZ}px) scale(${currentScale}) rotateX(${currentRotateX}deg)`,
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                boxShadow: dynamicShadow,
              }}
            >
              {isGoogleDrive ? (
                <iframe
                  src={`https://drive.google.com/file/d/${config?.googleDriveFileId}/preview`}
                  title="Showcase Video"
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : isNative && !sourceError ? (
                <>
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    playsInline
                    muted={isMuted}
                    autoPlay
                    loop
                    preload="metadata"
                    onError={() => setSourceError(true)}
                    onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onDurationChange={handleDurationChange}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handleEnded}
                onClick={togglePlayPause}
                className="w-full h-full object-cover cursor-pointer"
              />

              {!isPlaying && (
                <div
                  onClick={togglePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px] cursor-pointer z-30 transition-opacity"
                >
                  <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>
              )}

              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2 sm:p-2.5 pt-4 sm:pt-5 flex flex-col gap-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto transition-opacity duration-200"
              >
                <div className="w-full flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={duration > 0 ? duration : 0}
                    step={0.01}
                    value={duration > 0 ? Math.min(currentTime, duration) : 0}
                    onChange={handleSeek}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Seek video playback"
                    disabled={duration <= 0}
                    className="w-full h-1 sm:h-1.5 rounded-lg appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 transition-all focus:outline-none disabled:cursor-wait"
                    style={{
                      background: `linear-gradient(to right, #10b981 ${playbackProgress}%, rgba(51, 65, 85, 0.8) ${playbackProgress}%)`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={togglePlayPause}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      className="p-1 sm:p-1.5 rounded-md hover:bg-white/10 text-white transition-colors flex items-center justify-center shrink-0"
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
                      ) : (
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white ml-0.5" />
                      )}
                    </button>

                    <span className="font-mono text-[9px] sm:text-[11px] text-slate-300 select-none tabular-nums whitespace-nowrap">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                      className="p-1 sm:p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      ) : volume < 0.5 ? (
                        <Volume1 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                      )}
                    </button>

                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={displayedVolume}
                      onChange={handleVolumeChange}
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Adjust volume"
                      className="w-12 sm:w-16 h-1 rounded-lg appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 transition-all focus:outline-none"
                      style={{
                        background: `linear-gradient(to right, #10b981 ${displayedVolume * 100}%, rgba(51, 65, 85, 0.8) ${displayedVolume * 100}%)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-[#090d16] to-[#04060c]">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3 text-emerald-400">
                <Video className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="font-mono text-xs sm:text-sm font-bold text-slate-200">
                {locale === "bn" ? "সিস্টেম ডেমো ভিডিও শীঘ্রই আসছে" : "Demo Video Coming Soon"}
              </h3>
              <p className="font-mono text-[10px] sm:text-xs text-slate-500 mt-1 max-w-xs">
                {locale === "bn"
                  ? "অ্যাডমিন প্যানেল থেকে গুগল ড্রাইভ বা সরাসরি ভিডিও যুক্ত করা হলে এখানে প্রদর্শিত হবে।"
                  : "An interactive video walkthrough will be published here via the Admin CMS."}
              </p>
              <div className="mt-3 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] font-mono text-emerald-400/80">
                status: waiting_for_video
              </div>
            </div>
          )}
        </div>
          </div>

          <div
            className="w-[320px] sm:w-[460px] md:w-[570px] h-[110px] sm:h-[150px] md:h-[180px] rounded-b-xl sm:rounded-b-2xl bg-gradient-to-b from-[#14151f] via-[#0f1016] to-[#0a0b10] border border-[#222434] p-1.5 sm:p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between relative z-10 pointer-events-none"
            style={{
              transform: "rotateX(55deg)",
              transformOrigin: "top center",
            }}
          >
            <div className="w-20 sm:w-32 h-1 sm:h-1.5 rounded-b bg-[#08080c] mx-auto mb-0.5 border-b border-[#20212d]" />

            <div className="w-full flex-1 rounded-lg bg-[#06070a] border border-[#1a1b26] p-1 sm:p-1.5 shadow-inner overflow-hidden">
              <MacbookKeyboard />
            </div>

            <div className="w-20 sm:w-32 md:w-40 h-6 sm:h-9 md:h-11 rounded-md bg-[#0c0d14] border border-[#20212f] mx-auto mt-1 shadow-inner" />

            <div className="w-10 sm:w-14 h-0.5 rounded-full bg-[#1c1d2a] mx-auto mt-0.5" />
          </div>
        </div>
      </div>
    </section>
  );
}
