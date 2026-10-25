"use client";

import * as React from "react";
import Link from "next/link";
import {
  Terminal,
  Menu,
  X,
  FileText,
  ArrowUpRight,
  MoreVertical,
  Globe,
  Palette,
} from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

export function Navbar({ locale, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOverflowOpen, setIsOverflowOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const overflowRef = React.useRef<HTMLDivElement>(null);
  const overflowButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close overflow popover
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        overflowRef.current &&
        !overflowRef.current.contains(event.target as Node) &&
        overflowButtonRef.current &&
        !overflowButtonRef.current.contains(event.target as Node)
      ) {
        setIsOverflowOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOverflowOpen(false);
        setIsOpen(false);
      }
    };

    if (isOverflowOpen || isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOverflowOpen, isOpen]);

  const navLinks = [
    { href: `#about`, label: dict.nav.about },
    { href: `#skills`, label: dict.nav.skills },
    { href: `#experience`, label: dict.nav.experience },
    { href: `#projects`, label: dict.nav.projects },
    { href: `#blog`, label: dict.nav.blog },
    { href: `#contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200 border-b",
        scrolled
          ? "border-slate-800/80 bg-[#0a0d14]/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "border-transparent bg-[#0a0d14]/40 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Terminal Brand Logo */}
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2.5 font-mono text-sm sm:text-base font-bold text-slate-100 transition-colors shrink-0"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 group-hover:border-emerald-400 group-hover:bg-emerald-900/40 transition-all">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="flex items-center gap-1">
            <span className="text-emerald-400">~/</span>mehedi.dev
            <span className="inline-block h-4 w-1.5 bg-emerald-400/80 animate-pulse ml-0.5" />
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Controls (visible on lg screens) */}
          <div className="hidden lg:flex items-center gap-2.5">
            <LanguageSwitcher currentLocale={locale} />
            <ThemeToggle />
            <a href="#contact">
              <Button variant="terminal" size="sm" className="gap-1.5 text-xs">
                <FileText className="h-3.5 w-3.5" />
                <span>{dict.nav.resume}</span>
                <ArrowUpRight className="h-3 w-3 opacity-70" />
              </Button>
            </a>
          </div>

          {/* Mobile Three-Dot Overflow Button */}
          <div className="relative lg:hidden">
            <button
              ref={overflowButtonRef}
              type="button"
              onClick={() => {
                setIsOverflowOpen((prev) => !prev);
                setIsOpen(false); // Close main nav drawer if opening overflow
              }}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md border text-slate-300 hover:text-white transition-colors",
                isOverflowOpen
                  ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-400"
                  : "border-slate-800 bg-slate-900"
              )}
              aria-label="Language and theme preferences"
              aria-expanded={isOverflowOpen}
              aria-haspopup="true"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {/* Mobile Preferences Popover Dropdown */}
            {isOverflowOpen && (
              <div
                ref={overflowRef}
                role="dialog"
                aria-label="Preferences Menu"
                className="absolute right-0 top-11 w-56 rounded-xl border border-slate-800 bg-[#0c101a] p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3 font-mono text-xs"
              >
                {/* Language Switcher in Popover */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase tracking-wider px-1">
                    <span>Language / ভাষা</span>
                    <Globe className="h-3 w-3 text-emerald-400" />
                  </div>
                  <LanguageSwitcher
                    currentLocale={locale}
                    className="w-full justify-center"
                    onSwitch={() => setIsOverflowOpen(false)}
                  />
                </div>

                {/* Theme Toggle in Popover */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase tracking-wider px-1">
                    <span>Theme / থিম</span>
                    <Palette className="h-3 w-3 text-cyan-400" />
                  </div>
                  <ThemeToggle
                    showLabel
                    onToggle={() => setIsOverflowOpen(false)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Navigation Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen((prev) => !prev);
              setIsOverflowOpen(false); // Close overflow popover if opening nav
            }}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-300 hover:text-white lg:hidden transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay (Section Links only) */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0c101a] px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
          <nav className="flex flex-col space-y-3 font-mono text-sm" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-600">→</span>
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Button variant="terminal" size="sm" className="w-full justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{dict.nav.resume}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
