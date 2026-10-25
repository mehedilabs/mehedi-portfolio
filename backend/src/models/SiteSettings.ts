import mongoose, { Document, Schema } from "mongoose";
import { ISiteSettings } from "../types/index.js";

export interface ISiteSettingsDocument extends ISiteSettings, Document {}

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
    activeSections: {
      hero: { type: Boolean, default: true },
      about: { type: Boolean, default: true },
      skills: { type: Boolean, default: true },
      videoShowcase: { type: Boolean, default: true },
      projects: { type: Boolean, default: true },
      experience: { type: Boolean, default: true },
      education: { type: Boolean, default: true },
      blog: { type: Boolean, default: true },
      contact: { type: Boolean, default: true },
      assistant: { type: Boolean, default: true },
    },
    videoShowcase: {
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
