import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { Locale } from "@/types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { VideoShowcaseSection } from "@/components/sections/VideoShowcaseSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "bn" }];
}

export default async function LocalizedHomePage({
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

  return (
    <div className="space-y-0">
      <HeroSection locale={locale} dict={dict} />
      <AboutSection locale={locale} dict={dict} />
      <SkillsSection locale={locale} dict={dict} />
      <ProjectsSection locale={locale} dict={dict} />
      <ExperienceSection locale={locale} dict={dict} />
      <EducationSection locale={locale} dict={dict} />
      <VideoShowcaseSection locale={locale} dict={dict} />
      <BlogSection locale={locale} dict={dict} />
      <ContactSection locale={locale} dict={dict} />
    </div>
  );
}
