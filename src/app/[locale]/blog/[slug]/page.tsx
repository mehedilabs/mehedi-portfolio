import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { BLOG_POSTS_DATA } from "@/data/portfolio-data";
import { Locale } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Calendar, Clock, Terminal } from "lucide-react";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["en", "bn"]) {
    for (const post of BLOG_POSTS_DATA) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  const content = locale === "bn" ? post.bn : post.en;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    title: `${content.title} | Engineering Journal`,
    description: content.excerpt,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${post.slug}`,
      languages: {
        en: `${baseUrl}/en/blog/${post.slug}`,
        bn: `${baseUrl}/bn/blog/${post.slug}`,
      },
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dict = dictionaries[locale];

  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const content = locale === "bn" ? post.bn : post.en;

  return (
    <article className="py-16 mx-auto max-w-3xl xl:max-w-4xl px-4 sm:px-6 lg:px-8 xl:px-10 space-y-8">
      {/* Return to Blog */}
      <Link
        href={`/${locale}#blog`}
        className="inline-flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Engineering Journal</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-4 border-b border-slate-800 pb-8">
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

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {content.title}
        </h1>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-mono">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Article Body */}
      <div className="space-y-6 text-slate-300 leading-[1.75] text-base sm:text-[17px]">
        <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed bg-[#0c101a] p-6 rounded-xl border border-slate-800">
          {content.excerpt}
        </p>

        <p className="leading-[1.75]">{content.content}</p>

        {/* Phase 3 MDX CMS Notice */}
        <div className="mt-12 rounded-lg border border-slate-800 bg-slate-900/60 p-4 font-mono text-xs text-slate-400 flex items-center gap-3">
          <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Database-backed Markdown/MDX publishing system integration scheduled for Phase 3.
          </span>
        </div>
      </div>
    </article>
  );
}

