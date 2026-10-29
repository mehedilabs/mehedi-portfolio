"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/types";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
  onSwitch?: () => void;
}

export function LanguageSwitcher({
  currentLocale,
  className,
  onSwitch,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Preserve the rest of the pathname
    // e.g., /en/projects/my-slug -> /bn/projects/my-slug
    let newPath = pathname;
    if (pathname.startsWith(`/${currentLocale}`)) {
      newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${pathname === "/" ? "" : pathname}`;
    }

    // Preserve current URL hash if any
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(`${newPath}${hash}`);

    if (onSwitch) {
      onSwitch();
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-slate-800 bg-slate-900/90 p-1 text-xs font-mono backdrop-blur-sm",
        className
      )}
      role="group"
      aria-label="Language Switcher"
    >
      <button
        type="button"
        onClick={() => switchLanguage("en")}
        aria-label="Switch to English"
        aria-pressed={currentLocale === "en"}
        className={cn(
          "rounded px-2 py-1 transition-all duration-150 font-medium",
          currentLocale === "en"
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchLanguage("bn")}
        aria-label="Switch to Bangla"
        aria-pressed={currentLocale === "bn"}
        className={cn(
          "rounded px-2 py-1 transition-all duration-150 font-medium",
          currentLocale === "bn"
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
        )}
      >
        বাং
      </button>
    </div>
  );
}

