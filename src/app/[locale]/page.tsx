import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { dictionaries } from "@/data/dictionaries";
import { Locale, ProjectItem, BlogPostItem, ExperienceItem, EducationItem, CertificationItem } from "@/types";
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

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

const NUMBERED_SECTIONS = [
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "videoShowcase",
  "blog",
  "contact",
];

const SECTION_NAME_MAP: Record<string, { en: string; bn: string }> = {
  about: { en: "ABOUT_ME", bn: "আমার সম্পর্কে" },
  skills: { en: "TECH_STACK", bn: "টেকনোলজি স্ট্যাক" },
  projects: { en: "FEATURED_PROJECTS", bn: "ফিচার্ড প্রজেক্টস" },
  experience: { en: "CAREER_TRAJECTORY", bn: "কর্মজীবন ও অভিজ্ঞতা" },
  education: { en: "ACADEMICS_AND_CERTS", bn: "শিক্ষাগত যোগ্যতা" },
  videoShowcase: { en: "SYSTEM_DEMO", bn: "সিস্টেম ডেমো" },
  blog: { en: "TECHNICAL_INSIGHTS", bn: "টেকনিক্যাল ইনসাইটস" },
  contact: { en: "INITIATE_COMMUNICATION", bn: "যোগাযোগ করুন" },
};

function formatBengaliDigits(numStr: string): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return numStr.replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
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
  const isBn = locale === "bn";
  const dict = dictionaries[locale];

  let settings: PublicSiteSettings | null = null;
  let projects: ProjectItem[] = [];
  let blogPosts: BlogPostItem[] = [];
  let experiences: ExperienceItem[] = [];
  let educations: EducationItem[] = [];
  let certifications: CertificationItem[] = [];

  try {
    const [
      settingsRes,
      projectsRes,
      blogRes,
      expRes,
      eduRes,
      certRes,
    ] = await Promise.all([
      publicApi.getPublicSettings().catch(() => null),
      publicApi.getProjects().catch(() => null),
      publicApi.getBlogPosts().catch(() => null),
      publicApi.getExperience().catch(() => null),
      publicApi.getEducation().catch(() => null),
      publicApi.getCertifications().catch(() => null),
    ]);

    if (settingsRes?.success && settingsRes.data) {
      settings = settingsRes.data;
    }
    if (projectsRes?.success && Array.isArray(projectsRes.data)) {
      projects = projectsRes.data;
    }
    if (blogRes?.success && Array.isArray(blogRes.data)) {
      blogPosts = blogRes.data;
    }
    if (expRes?.success && Array.isArray(expRes.data)) {
      experiences = expRes.data;
    }
    if (eduRes?.success && Array.isArray(eduRes.data)) {
      educations = eduRes.data;
    }
    if (certRes?.success && Array.isArray(certRes.data)) {
      certifications = certRes.data;
    }
  } catch {
    // API is offline or unavailable during static fallback
  }

  const activeMap = settings?.activeSections || {};

  // Compute ordered section IDs
  const orderedSectionIds =
    settings?.sections && settings.sections.length > 0
      ? [...settings.sections]
          .sort((a, b) => a.order - b.order)
          .map((s) => s.id)
          .filter((id) => activeMap[id] !== false)
      : DEFAULT_ORDER.filter((id) => activeMap[id] !== false);

  // Compute dynamic section numbers for numbered visible sections
  const dynamicTagMap: Record<string, string> = {};
  let currentStep = 1;

  for (const id of orderedSectionIds) {
    if (NUMBERED_SECTIONS.includes(id)) {
      const stepStr = String(currentStep).padStart(2, "0");
      const names = SECTION_NAME_MAP[id] || { en: id.toUpperCase(), bn: id };

      if (isBn) {
        dynamicTagMap[id] = `${formatBengaliDigits(stepStr)}. ${names.bn}`;
      } else {
        dynamicTagMap[id] = `${stepStr}. ${names.en}`;
      }
      currentStep++;
    }
  }

  const sectionMap: Record<string, React.ReactNode> = {
    hero: (
      <HeroSection
        key="hero"
        locale={locale}
        dict={dict}
        profile={settings?.profile}
        resumeUrl={settings?.resumeUrl}
      />
    ),
    about: (
      <AboutSection
        key="about"
        locale={locale}
        dict={dict}
        profile={settings?.profile}
        sectionTag={dynamicTagMap.about}
      />
    ),
    skills: <SkillsSection key="skills" locale={locale} dict={dict} />,
    projects: (
      <ProjectsSection
        key="projects"
        locale={locale}
        dict={dict}
        projects={projects}
        sectionTag={dynamicTagMap.projects}
      />
    ),
    experience: (
      <ExperienceSection
        key="experience"
        locale={locale}
        dict={dict}
        items={experiences}
        sectionTag={dynamicTagMap.experience}
      />
    ),
    education: (
      <EducationSection
        key="education"
        locale={locale}
        dict={dict}
        items={educations}
        certifications={certifications}
        sectionTag={dynamicTagMap.education}
      />
    ),
    videoShowcase: (
      <VideoShowcaseSection
        key="videoShowcase"
        locale={locale}
        dict={dict}
        config={settings?.videoShowcase}
      />
    ),
    blog: (
      <BlogSection
        key="blog"
        locale={locale}
        dict={dict}
        posts={blogPosts}
        sectionTag={dynamicTagMap.blog}
      />
    ),
    contact: (
      <ContactSection
        key="contact"
        locale={locale}
        dict={dict}
        profile={settings?.profile}
      />
    ),
  };

  return (
    <div className="space-y-0">
      {orderedSectionIds
        .filter((id) => Boolean(sectionMap[id]))
        .map((id) => sectionMap[id])}
    </div>
  );
}
