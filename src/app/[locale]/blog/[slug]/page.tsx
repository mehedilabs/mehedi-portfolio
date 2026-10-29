import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { Locale, BlogPostItem } from "@/types";
import { publicApi } from "@/lib/api-client";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  let post: BlogPostItem | null = null;
  try {
    const res = await publicApi.getBlogPostBySlug(slug);
    if (res.success && res.data) {
      post = res.data;
    }
  } catch {
    post = null;
  }

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

  let post: BlogPostItem | null = null;
  try {
    const res = await publicApi.getBlogPostBySlug(slug);
    if (res.success && res.data) {
      post = res.data;
    }
  } catch {
    post = null;
  }

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
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {post.publishedAt}
            </span>
          )}
          {post.publishedAt && post.readTime && <span>•</span>}
          {post.readTime && (
            <span className="flex items-center gap-1 text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} {dict.blog.readTime}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {content.title}
        </h1>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs font-mono">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="prose prose-invert max-w-none text-slate-300 font-sans leading-relaxed text-base sm:text-lg space-y-6">
        <p className="text-xl font-medium text-slate-200 leading-relaxed border-l-2 border-emerald-500 pl-4 italic">
          {content.excerpt}
        </p>

        <div className="whitespace-pre-line text-slate-300">
          {content.content}
        </div>
      </div>
    </article>
  );
}
