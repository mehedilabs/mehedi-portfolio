import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { Locale } from "@/types";
import { publicApi, PublicSiteSettings } from "@/lib/api-client";
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

const DEFAULT_ORDER = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "videoShowcase",
  "blog",
  "contact",
];

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

  let settings: PublicSiteSettings | null = null;
  try {
    const res = await publicApi.getPublicSettings();
    if (res.success && res.data) {
      settings = res.data;
    }
  } catch {
    // API is offline or unavailable during static generation - fallback gracefully
  }

  const sectionMap: Record<string, React.ReactNode> = {
    hero: <HeroSection key="hero" locale={locale} dict={dict} />,
    about: <AboutSection key="about" locale={locale} dict={dict} />,
    skills: <SkillsSection key="skills" locale={locale} dict={dict} />,
    projects: <ProjectsSection key="projects" locale={locale} dict={dict} />,
    experience: <ExperienceSection key="experience" locale={locale} dict={dict} />,
    education: <EducationSection key="education" locale={locale} dict={dict} />,
    videoShowcase: (
      <VideoShowcaseSection
        key="videoShowcase"
        locale={locale}
        dict={dict}
        config={settings?.videoShowcase}
      />
    ),
    blog: <BlogSection key="blog" locale={locale} dict={dict} />,
    contact: <ContactSection key="contact" locale={locale} dict={dict} />,
  };

  const activeMap = settings?.activeSections || {};

  const orderedSectionIds = settings?.sections && settings.sections.length > 0
    ? [...settings.sections]
        .sort((a, b) => a.order - b.order)
        .map((s) => s.id)
        .filter((id) => (activeMap[id] ?? true) && Boolean(sectionMap[id]))
    : DEFAULT_ORDER.filter((id) => (activeMap[id] ?? true) && Boolean(sectionMap[id]));

  return (
    <div className="space-y-0">
      {orderedSectionIds.map((id) => sectionMap[id])}
    </div>
  );
}
