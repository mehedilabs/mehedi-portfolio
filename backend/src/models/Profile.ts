import mongoose, { Document, Schema } from "mongoose";
import { IProfile } from "../types/index.js";

export interface IProfileDocument extends IProfile, Document {}

const ProfileSchema = new Schema<IProfileDocument>(
  {
    name: {
      type: String,
      default: "Mehedi Hasan",
      trim: true,
    },
    email: {
      type: String,
      default: "contact@mehedi.dev",
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      default: "Dhaka, Bangladesh (UTC+6)",
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: "/images/hero-profile.png",
    },
    aboutPhotoUrl: {
      type: String,
      default: "/images/about-workspace.png",
    },
    resumeUrl: {
      type: String,
      default: "/documents/resume-mehedi-hasan.pdf",
    },
    socialLinks: {
      github: { type: String, default: "https://github.com/mehedilabs" },
      linkedin: { type: String, default: "https://linkedin.com/in/mehedilabs" },
      twitter: { type: String, default: "https://x.com/mehedilabs" },
      youtube: { type: String, default: "" },
    },
    en: {
      title: { type: String, default: "Senior Full-Stack Architect" },
      bio: {
        type: String,
        default:
          "Passionate software engineer building resilient, high-throughput distributed web systems.",
      },
      aboutHeadline: {
        type: String,
        default: "Engineering robust, scalable software with deep architectural care.",
      },
      aboutParagraphs: {
        type: [String],
        default: [
          "I specialize in architecting end-to-end full-stack web applications, microservices, and reliable cloud infrastructures.",
          "My focus is on maintainability, performance benchmarks, and clean developer workflows.",
        ],
      },
    },
    bn: {
      title: { type: String, default: "সিনিয়র ফুল-স্ট্যাক আর্কিটেক্ট" },
      bio: {
        type: String,
        default:
          "স্কেলযোগ্য, উচ্চ ক্ষমতাসম্পন্ন ও সুরক্ষিত ওয়েব অ্যাপ্লিকেশন নির্মাতা ও আর্কিটেক্ট।",
      },
      aboutHeadline: {
        type: String,
        default: "পরিকল্পিত আর্কিটেকচার ও নিখুঁত কোডিংয়ের সমন্বয়ে আধুনিক সফটওয়্যার নির্মাণ।",
      },
      aboutParagraphs: {
        type: [String],
        default: [
          "আমি এন্ড-টু-এন্ড ফুল-স্ট্যাক ওয়েব সিস্টেম, মাইক্রোসার্ভিসেস এবং ক্লাউড সমাধান তৈরিতে পারদর্শী।",
          "কোডের স্থায়িত্ব, পারফরম্যান্স এবং ক্লিন ডেভেলপার এক্সপেরিয়েন্স আমার কাজের মূল ভিত্তি।",
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

export const ProfileModel =
  mongoose.models.Profile || mongoose.model<IProfileDocument>("Profile", ProfileSchema);
