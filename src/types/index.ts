export type Locale = "en" | "bn";

export interface LocalizedString {
  en: string;
  bn: string;
}

export interface LocalizedContent {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  highlights: string[];
  metrics?: string;
  caseStudy?: {
    overview: string;
    challenge: string;
    solution: string;
    architecture: string;
    results: string[];
  };
}

export interface ProjectItem {
  id: string;
  category: "fullstack" | "backend" | "cloud" | "frontend";
  featured: boolean;
  order: number;
  thumbnail: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  en: LocalizedContent;
  bn: LocalizedContent;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  iconName: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  icon: string;
  en: {
    title: string;
    description: string;
  };
  bn: {
    title: string;
    description: string;
  };
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  current?: boolean;
  techStack: string[];
  en: {
    role: string;
    company: string;
    location: string;
    type: string;
    description: string;
    achievements: string[];
  };
  bn: {
    role: string;
    company: string;
    location: string;
    type: string;
    description: string;
    achievements: string[];
  };
}

export interface EducationItem {
  id: string;
  period: string;
  en: {
    degree: string;
    institution: string;
    location: string;
    description: string;
    courses: string[];
  };
  bn: {
    degree: string;
    institution: string;
    location: string;
    description: string;
    courses: string[];
  };
}

export interface BlogPostItem {
  id: string;
  slug: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
  en: {
    title: string;
    excerpt: string;
    content: string;
  };
  bn: {
    title: string;
    excerpt: string;
    content: string;
  };
}

export interface AssistantQAPair {
  id: string;
  category: "experience" | "skills" | "freelance" | "contact" | "architecture";
  en: {
    question: string;
    answer: string;
  };
  bn: {
    question: string;
    answer: string;
  };
}

export interface NavItem {
  href: string;
  en: string;
  bn: string;
}

