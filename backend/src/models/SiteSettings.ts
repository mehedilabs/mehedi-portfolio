import mongoose, { Document, Schema } from "mongoose";
import { ISiteSettings } from "../types/index.js";

export interface ISiteSettingsDocument extends Omit<ISiteSettings, "_id">, Document {}

const DEFAULT_SECTIONS = [
  { id: "hero", label: "Hero & Introduction", enabled: true, order: 1 },
  { id: "about", label: "About & Philosophy", enabled: true, order: 2 },
  { id: "skills", label: "Skills & Technologies", enabled: true, order: 3 },
  { id: "videoShowcase", label: "Video Showcase (Laptop Demo)", enabled: true, order: 4 },
  { id: "experience", label: "Professional Experience", enabled: true, order: 5 },
  { id: "education", label: "Education & Coursework", enabled: true, order: 6 },
  { id: "projects", label: "Featured Projects & Case Studies", enabled: true, order: 7 },
  { id: "blog", label: "Engineering Articles & Blog", enabled: true, order: 8 },
  { id: "contact", label: "Contact & Inquiries", enabled: true, order: 9 },
  { id: "assistant", label: "Interactive Chat Assistant", enabled: true, order: 10 },
];

const SectionItemSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const SiteSettingsSchema = new Schema<ISiteSettingsDocument>(
  {
    siteName: {
      type: String,
      default: "Mehedi Hasan Portfolio",
      trim: true,
    },
    brandTagline: {
      type: String,
      default: "Full-Stack Development Solutions",
      trim: true,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    sections: {
      type: [SectionItemSchema],
      default: DEFAULT_SECTIONS,
    },
    activeSections: {
      type: Map,
      of: Boolean,
      default: {
        hero: true,
        about: true,
        skills: true,
        videoShowcase: true,
        projects: true,
        experience: true,
        education: true,
        blog: true,
        contact: true,
        assistant: true,
      },
    },
    videoShowcase: {
      videoSourceType: {
        type: String,
        enum: ["google-drive", "native-url"],
        default: "native-url",
      },
      googleDriveSharingUrl: {
        type: String,
        default: "",
      },
      googleDriveFileId: {
        type: String,
        default: "",
      },
      videoUrl: {
        type: String,
        default: "/videos/demo-showcase.mp4",
      },
      posterUrl: {
        type: String,
        default: "",
      },
      aspectRatio: {
        type: String,
        default: "16:10",
      },
      autoPlay: {
        type: Boolean,
        default: true,
      },
      loop: {
        type: Boolean,
        default: true,
      },
      muted: {
        type: Boolean,
        default: true,
      },
      en: {
        badge: { type: String, default: "04. SYSTEM_DEMO" },
        headingHighlight: { type: String, default: "Full-Stack" },
        headingNormal: { type: String, default: "Development Solutions" },
        subheading: { type: String, default: "High-performance architecture in action" },
      },
      bn: {
        badge: { type: String, default: "০৪. সিস্টেম ডেমো" },
        headingHighlight: { type: String, default: "সিস্টেম আর্কিটেকচার" },
        headingNormal: { type: String, default: "ডেভেলপমেন্ট সল্যুশনস" },
        subheading: { type: String, default: "সিস্টেমের বাস্তব কর্মক্ষমতা" },
      },
    },
    seo: {
      defaultTitle: {
        type: String,
        default: "Mehedi Hasan — Senior Full-Stack Architect",
      },
      defaultDescription: {
        type: String,
        default: "Bilingual portfolio & enterprise full-stack solutions by Mehedi Hasan.",
      },
      ogImage: {
        type: String,
        default: "/images/og-cover.png",
      },
      keywords: {
        type: [String],
        default: ["Full-Stack", "Next.js", "Express", "TypeScript", "MongoDB", "Architecture"],
      },
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettingsModel =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettingsDocument>("SiteSettings", SiteSettingsSchema);
