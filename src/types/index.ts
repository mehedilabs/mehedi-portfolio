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
  _id?: string;
  category: "fullstack" | "backend" | "cloud" | "frontend";
  featured: boolean;
  order: number;
  thumbnail: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPublished?: boolean;
  en: LocalizedContent;
  bn: LocalizedContent;
}

export interface SkillItem {
  _id?: string;
  name: string;
  level: number; // 0 - 100
  iconName: string;
  category?: string;
  highlight?: boolean;
  order?: number;
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
  _id?: string;
  period: string;
  current?: boolean;
  order?: number;
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
  _id?: string;
  period: string;
  order?: number;
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
  _id?: string;
  slug: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
  isPublished?: boolean;
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
  _id?: string;
  category: "experience" | "skills" | "freelance" | "contact" | "architecture" | string;
  order?: number;
  isActive?: boolean;
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

export interface CertificationItem {
  id?: string;
  _id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  order?: number;
  en?: {
    title: string;
    description: string;
  };
  bn?: {
    title: string;
    description: string;
  };
}

export interface ContactMessageItem {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  subject: string;
  inquiryType?: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  repliedAt?: string;
  createdAt: string;
}

export interface MediaAssetItem {
  _id?: string;
  id?: string;
  filename: string;
  publicId?: string;
  url: string;
  format?: string;
  bytes?: number;
  category: string;
  createdAt?: string;
}

export interface ProfileData {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  avatarUrl?: string;
  aboutPhotoUrl?: string;
  resumeUrl?: string;
  availabilityText?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  en: {
    title: string;
    bio: string;
    aboutHeadline: string;
    aboutParagraphs: string[];
  };
  bn: {
    title: string;
    bio: string;
    aboutHeadline: string;
    aboutParagraphs: string[];
  };
  [key: string]: unknown;
}

export interface SiteSettingsData {
  _id?: string;
  siteName: string;
  brandTagline: string;
  sections?: Array<{ id: string; label: string; enabled: boolean; order: number }>;
  activeSections?: Record<string, boolean>;
  videoShowcase?: Record<string, unknown>;
  [key: string]: unknown;
}

