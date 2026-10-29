"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Locale, BlogPostItem } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";

interface BlogSectionProps {
  locale: Locale;
  dict: Dictionary;
  posts?: BlogPostItem[];
  sectionTag?: string;
}

export function BlogSection({ locale, dict, posts, sectionTag }: BlogSectionProps) {
  // Only render genuine CMS-persisted blog posts; no fabricated hardcoded demo posts
  const sourcePosts = Array.isArray(posts) ? posts : [];
  const displayTag = sectionTag || dict.blog.sectionTag;
  const hasPosts = sourcePosts.length > 0;

  return (
    <section id="blog" className="py-20 border-t border-slate-200 dark:border-slate-900 bg-white/50 dark:bg-[#080b12] relative z-20 transition-colors">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Heading */}
        <div className="space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {displayTag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {dict.blog.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-[17px] max-w-3xl leading-relaxed">
            {dict.blog.subtitle}
          </p>
        </div>

        {/* Real Blog Posts Grid or Localized Coming Soon Empty State */}
        {!hasPosts ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-12 text-center font-mono">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              {locale === "bn" ? "টেকনিক্যাল ইনসাইটস শীঘ্রই আসছে" : "Articles & Insights Coming Soon"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              {locale === "bn"
                ? "সফটওয়্যার ইঞ্জিনিয়ারিং, ডিস্ট্রিবিউটেড সিস্টেম ও আর্কিটেকচার সম্পর্কিত বিস্তারিত আর্টিকেল শীঘ্রই সিএমএস-এর মাধ্যমে প্রকাশিত হবে।"
                : "Deep dives on system architecture, distributed microservices, and modern engineering practices are currently being authored and will be published here."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {sourcePosts.map((post) => {
              const postContent = locale === "bn" ? post.bn : post.en;
              const postSlug = post.slug || post.en?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-");

              return (
                <Card
                  key={post.id || post._id}
                  glow="cyan"
                  className="bg-white dark:bg-[#0b0f19] border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm dark:shadow-none"
                >
                  <div>
                    <CardHeader className="p-6 sm:p-7 pb-2 space-y-3">
                      <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                            {post.publishedAt}
                          </span>
                        )}
                        {post.publishedAt && post.readTime && <span>•</span>}
                        {post.readTime && (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime} {dict.blog.readTime}
                          </span>
                        )}
                      </div>

                      <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        {postContent?.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-6 sm:px-7 py-2 space-y-3">
                      <p className="text-sm sm:text-base lg:text-[17px] text-slate-700 dark:text-slate-300 leading-[1.7]">
                        {postContent?.excerpt}
                      </p>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-[11px] font-mono border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </div>

                  <CardFooter className="p-6 sm:p-7 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <Link
                      href={`/${locale}/blog/${postSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 group cursor-pointer hover:underline"
                    >
                      <span>{dict.blog.readArticle}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
