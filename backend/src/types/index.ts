export type Locale = "en" | "bn";

export interface ILocalizedProjectContent {
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
  seoTitle?: string;
  seoDescription?: string;
}

export interface IProject {
  category: "fullstack" | "backend" | "cloud" | "frontend";
  featured: boolean;
  order: number;
  thumbnail: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  en: ILocalizedProjectContent;
  bn: ILocalizedProjectContent;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILocalizedBlogContent {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface IBlogPost {
  slug: string;
  publishedAt: Date;
  readTime: string;
  tags: string[];
  coverImage?: string;
  isPublished: boolean;
  en: ILocalizedBlogContent;
  bn: ILocalizedBlogContent;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISkill {
  category: "frontend" | "backend" | "database" | "cloud" | "tools";
  name: string;
  level: number; // 0 - 100
  iconName: string;
  highlight: boolean;
  order: number;
}

export interface IExperience {
  period: string;
  current: boolean;
  techStack: string[];
  order: number;
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

export interface IEducation {
  period: string;
  order: number;
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

export interface IMessage {
  name: string;
  email: string;
  subject: string;
  inquiryType: "job" | "freelance" | "consulting" | "other";
  message: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: Date;
}

export interface IAssistantQA {
  category: "experience" | "skills" | "freelance" | "contact" | "architecture";
  order: number;
  isActive: boolean;
  en: {
    question: string;
    answer: string;
  };
  bn: {
    question: string;
    answer: string;
  };
}

export interface IUser {
  username: string;
  email: string;
  passwordHash: string;
  role: "admin" | "demo";
  createdAt: Date;
}

