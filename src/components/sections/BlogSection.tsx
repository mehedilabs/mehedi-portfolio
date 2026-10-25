"use client";

import * as React from "react";
import { Calendar, Clock, ArrowRight, Terminal } from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { BLOG_POSTS_DATA } from "@/data/portfolio-data";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";

interface BlogSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function BlogSection({ locale, dict }: BlogSectionProps) {
  return (
    <section id="blog" className="py-20 border-t border-slate-900 bg-[#080b12]/50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {dict.blog.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {dict.blog.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            {dict.blog.subtitle}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS_DATA.map((post) => {
            const postContent = locale === "bn" ? post.bn : post.en;

            return (
              <Card
                key={post.id}
                glow="cyan"
                className="bg-[#0b0f19] border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="p-6 pb-2 space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime} {dict.blog.readTime}
                      </span>
                    </div>

                    <CardTitle className="text-lg font-bold text-white hover:text-cyan-400 transition-colors">
                      {postContent.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 py-2 space-y-3">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {postContent.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[11px] font-mono">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="p-6 pt-4 border-t border-slate-800/80">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 group cursor-pointer hover:underline">
                    <span>{dict.blog.readArticle}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Phase 3 Blog Engine Notice */}
        <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900/60 p-4 font-mono text-xs text-slate-400 flex items-center gap-3">
          <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{dict.blog.comingSoon}</span>
        </div>
      </div>
    </section>
  );
}
