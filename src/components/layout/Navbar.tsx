"use client";

import * as React from "react";
import Link from "next/link";
import { Terminal, Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

export function Navbar({ locale, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Terminal Brand Logo */}
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2.5 font-mono text-sm sm:text-base font-bold text-slate-100 transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 group-hover:border-emerald-400 group-hover:bg-emerald-900/40 transition-all">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="flex items-center gap-1">
            <span className="text-emerald-400">~/</span>mehedi.dev
            <span className="inline-block h-4 w-1.5 bg-emerald-400/80 animate-pulse ml-0.5" />
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Right Controls: Language Switcher + Resume + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher currentLocale={locale} />

          <a
            href="#contact"
            className="hidden sm:inline-flex"
          >
            <Button variant="terminal" size="sm" className="gap-1.5 text-xs">
              <FileText className="h-3.5 w-3.5" />
              <span>{dict.nav.resume}</span>
              <ArrowUpRight className="h-3 w-3 opacity-70" />
            </Button>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-300 hover:text-white lg:hidden transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
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

