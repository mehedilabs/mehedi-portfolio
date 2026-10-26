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
  _id?: string;
  category: "fullstack" | "backend" | "cloud" | "frontend";
  featured: boolean;
  isPublished: boolean;
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
  _id?: string;
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
  _id?: string;
  category: "frontend" | "backend" | "database" | "cloud" | "tools";
  name: string;
  level: number; // 0 - 100
  iconName: string;
  highlight: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExperience {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEducation {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICertification {
  _id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  order: number;
  en: {
    title: string;
    description: string;
  };
  bn: {
    title: string;
    description: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  inquiryType: "job" | "freelance" | "consulting" | "other";
  message: string;
  isRead: boolean;
  isArchived: boolean;
  repliedAt?: Date;
  ipAddress?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IAssistantQA {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "owner" | "admin" | "demo";
  tokenVersion: number;
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISession {
  userId: string;
  userAgent?: string;
  ipAddress?: string;
  isValid: boolean;
  expiresAt: Date;
  createdAt: Date;
}

export interface IProfile {
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
  updatedAt: Date;
}

export interface IVideoShowcaseSettings {
  videoSourceType: "google-drive" | "native-url";
  googleDriveSharingUrl?: string;
  googleDriveFileId?: string;
  videoUrl: string;
  posterUrl?: string;
  aspectRatio: string;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
  en: {
    badge: string;
    headingHighlight: string;
    headingNormal: string;
    subheading?: string;
  };
  bn: {
    badge: string;
    headingHighlight: string;
    headingNormal: string;
    subheading?: string;
  };
}

export interface ISectionItem {
  id: string; // 'hero' | 'about' | 'skills' | 'videoShowcase' | 'experience' | 'education' | 'projects' | 'blog' | 'contact' | 'assistant'
  label: string;
  enabled: boolean;
  order: number;
}

export interface ISiteSettings {
  _id?: string;
  siteName: string;
  brandTagline: string;
  maintenanceMode: boolean;
  sections: ISectionItem[];
  activeSections: Record<string, boolean>;
  videoShowcase: IVideoShowcaseSettings;
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage?: string;
    keywords: string[];
  };
  updatedAt: Date;
}

export interface IMediaAsset {
  _id?: string;
  filename: string;
  publicId?: string;
  url: string;
  format: string;
  bytes: number;
  width?: number;
  height?: number;
  category: "avatar" | "project" | "blog" | "video" | "document" | "other";
  altText: {
    en: string;
    bn: string;
  };
  uploadedBy?: string;
  createdAt: Date;
}

export interface IPage {
  _id?: string;
  slug: string;
  isPublished: boolean;
  en: {
    title: string;
    content: string;
    seoTitle?: string;
    seoDescription?: string;
  };
  bn: {
    title: string;
    content: string;
    seoTitle?: string;
    seoDescription?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuditLog {
  _id?: string;
  action: string;
  resource: string;
  resourceId?: string;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
  createdAt: Date;
}
