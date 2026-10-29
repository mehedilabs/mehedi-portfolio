import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Home, BookOpen, Calendar, Clock } from "lucide-react";
import { isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { Locale, BlogPostItem } from "@/types";
import { publicApi } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "bn" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = dictionaries[locale];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    title: `${dict.blog.title} | ${dict.site.name}`,
    description: dict.blog.subtitle,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        en: `${baseUrl}/en/blog`,
        bn: `${baseUrl}/bn/blog`,
        "x-default": `${baseUrl}/en/blog`,
      },
    },
    openGraph: {
      title: `${dict.blog.title} | ${dict.site.name}`,
      description: dict.blog.subtitle,
      url: `${baseUrl}/${locale}/blog`,
      siteName: dict.site.name,
      locale: locale === "bn" ? "bn_BD" : "en_US",
      type: "website",
    },
  };
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dict = dictionaries[locale];

  let posts: BlogPostItem[] = [];
  try {
    const res = await publicApi.getBlogPosts();
    if (res.success && Array.isArray(res.data)) {
      posts = res.data.filter((p) => p.isPublished !== false);
    }
  } catch {
    posts = [];
  }

  return (
    <div className="py-10 sm:py-14 md:py-18">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10 space-y-8 sm:space-y-10">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{locale === "bn" ? "হোমে ফিরে যান" : "Back to Home"}</span>
          </Link>

          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-xs text-slate-500"
          >
            <Link
              href={`/${locale}`}
              className="flex items-center gap-1 hover:text-slate-300 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-400 font-medium">
              {locale === "bn" ? "ব্লগ" : "Blog"}
            </span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {dict.blog.sectionTag}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {dict.blog.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base lg:text-[17px] leading-relaxed">
            {dict.blog.subtitle}
          </p>
        </div>

        {/* Posts list or Coming Soon */}
        {posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 bg-[#0b0f19]/60 p-16 text-center font-mono">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">
              {locale === "bn"
                ? "আর্টিকেল শীঘ্রই আসছে"
                : "Articles Coming Soon"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              {dict.blog.comingSoon}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8">
            {posts.map((post) => {
              const content = locale === "bn" ? post.bn : post.en;
              const fallbackContent = post.en;
              const displayContent = content ?? fallbackContent;
              const slug = post.slug || post._id || post.id;
              const title =
                displayContent?.title || fallbackContent?.title || "Untitled";
              const description =
                displayContent?.excerpt ||
                fallbackContent?.excerpt ||
                "";
              const dateStr = post.publishedAt;
              const formattedDate = dateStr
                ? new Date(dateStr).toLocaleDateString(
                    locale === "bn" ? "bn-BD" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" },
                  )
                : null;

              return (
                <article
                  key={post._id}
                  className="group rounded-xl border border-slate-800/80 bg-[#0c101a] p-6 sm:p-8 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs font-mono"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {formattedDate && (
                      <span className="flex items-center gap-1 font-mono text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {formattedDate}
                      </span>
                    )}
                    {post.readTime && (
                      <span className="flex items-center gap-1 font-mono text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime} {dict.blog.readTime}
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    <Link href={`/${locale}/blog/${slug}`}>{title}</Link>
                  </h2>

                  {description && (
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {description}
                    </p>
                  )}

                  <Link
                    href={`/${locale}/blog/${slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>{dict.blog.readArticle}</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom nav */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <Link href={`/${locale}`}>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 font-mono text-xs text-slate-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{locale === "bn" ? "হোমে ফিরে যান" : "Back to Home"}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
