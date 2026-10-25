import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingAssistant } from "@/components/assistant/FloatingAssistant";
import { Locale } from "@/types";

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
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    title: {
      default: `${dict.site.name} — ${dict.site.role}`,
      template: `%s | ${dict.site.name}`,
    },
    description: dict.site.tagline,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        bn: `${baseUrl}/bn`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: `${dict.site.name} — ${dict.site.role}`,
      description: dict.site.tagline,
      url: `${baseUrl}/${locale}`,
      siteName: dict.site.name,
      locale: locale === "bn" ? "bn_BD" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.site.name} — ${dict.site.role}`,
      description: dict.site.tagline,
    },
  };
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dict = dictionaries[locale];

  return (
    <div className={`min-h-screen flex flex-col ${locale === "bn" ? "locale-bn" : ""}`}>
      {/* Top Banner Notice: Architecture Placeholder Marker */}
      <div className="w-full bg-slate-900/90 border-b border-emerald-500/20 px-3 py-1 text-center font-mono text-[11px] text-slate-400">
        <span className="text-emerald-400 font-semibold">[PROD-READY ARCHITECTURE]</span>{" "}
        {dict.common.placeholderNotice}
      </div>

      <Navbar locale={locale} dict={dict} />
      <main className="flex-1 w-full">{children}</main>
      <Footer dict={dict} />
      <FloatingAssistant locale={locale} dict={dict} />
    </div>
  );
}

