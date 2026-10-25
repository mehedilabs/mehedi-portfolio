"use client";

import * as React from "react";
import { Terminal, ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";
import { Dictionary } from "@/data/dictionaries";
import { CONTACT_INFO } from "@/data/portfolio-data";

interface FooterProps {
  dict: Dictionary;
}

export function Footer({ dict }: FooterProps) {
  const currentYear = 2026;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#070a0f] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 xl:px-10 mt-24">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand & Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 font-mono text-slate-200 font-semibold">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                <Terminal className="h-3.5 w-3.5" />
              </div>
              <span>{dict.site.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                online
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed">
              {dict.site.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-md border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-md border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="h-9 w-9 rounded-md border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                aria-label="Email Mehedi"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={CONTACT_INFO.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-md border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-colors"
                aria-label="Twitter Profile"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-xs">
              System Sections
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  &gt; {dict.nav.about}
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-emerald-400 transition-colors">
                  &gt; {dict.nav.skills}
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-emerald-400 transition-colors">
                  &gt; {dict.nav.experience}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-emerald-400 transition-colors">
                  &gt; {dict.nav.projects}
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-emerald-400 transition-colors">
                  &gt; {dict.nav.blog}
                </a>
              </li>
            </ul>
          </div>

          {/* Infrastructure Specs */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-xs">
              Platform Specs
            </h4>
            <div className="space-y-2 text-slate-400">
              <p>• Architecture: Monorepo</p>
              <p>• Frontend: Next.js 16 (App Router)</p>
              <p>• Backend: Express.js (TypeScript)</p>
              <p>• Database: MongoDB Atlas</p>
              <p>• Styling: Tailwind CSS v4</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Tech Stack, Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {currentYear} {dict.footer.rights} {dict.site.name}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors py-1 px-2 rounded hover:bg-slate-900 border border-transparent hover:border-slate-800"
              aria-label={dict.footer.backToTop}
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>{dict.footer.backToTop}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

