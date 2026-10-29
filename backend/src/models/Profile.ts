import mongoose, { Document, Schema } from "mongoose";
import { IProfile } from "../types/index.js";

export interface IProfileDocument extends Omit<IProfile, "_id">, Document {}

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
    avatarAlt: {
      type: String,
      default: "Mehedi Hasan — Profile Photo",
    },
    aboutPhotoUrl: {
      type: String,
      default: "/images/about-workspace.png",
    },
    aboutPhotoAlt: {
      type: String,
      default: "Mehedi Hasan — Developer Workspace",
    },
    resumeUrl: {
      type: String,
      default: "/documents/resume-mehedi-hasan.pdf",
    },
    availabilityText: {
      type: String,
      default: "Available for Senior Roles & Architecture Consulting",
      trim: true,
    },
    socialLinks: {
      github: { type: String, default: "https://github.com/mehedilabs" },
      linkedin: { type: String, default: "https://linkedin.com/in/mehedilabs" },
      twitter: { type: String, default: "https://x.com/mehedilabs" },
      youtube: { type: String, default: "" },
    },
    en: {
      title: { type: String, default: "Senior Full-Stack Architect" },
      greeting: { type: String, default: "Hello, World! I am" },
      bio: {
        type: String,
        default:
          "Passionate software engineer building resilient, high-throughput distributed web systems.",
      },
      summary: {
        type: String,
        default:
          "I build clean, accessible, and high-performance web systems with modern React, Next.js, TypeScript, and microservices.",
      },
      aboutTitle: { type: String, default: "About Me" },
      aboutHeadline: {
        type: String,
        default: "Building clean, modern, and user-friendly web applications.",
      },
      aboutParagraphs: {
        type: [String],
        default: [
          "I specialize in architecting end-to-end full-stack web applications, microservices, and reliable cloud infrastructures.",
          "My focus is on maintainability, performance benchmarks, and clean developer workflows.",
          "Passionate about developer experience, web performance, and continuous integration pipelines.",
        ],
      },
    },
    bn: {
      title: { type: String, default: "সিনিয়র ফুল-স্ট্যাক আর্কিটেক্ট" },
      greeting: { type: String, default: "হ্যালো, আমি" },
      bio: {
        type: String,
        default:
          "স্কেলযোগ্য, উচ্চ ক্ষমতাসম্পন্ন ও সুরক্ষিত ওয়েব অ্যাপ্লিকেশন নির্মাতা ও আর্কিটেক্ট।",
      },
      summary: {
        type: String,
        default:
          "আমি আধুনিক রিঅ্যাক্ট, নেক্সট.জেএস, টাইপস্ক্রিপ্ট ও মাইক্রোসার্ভিসেস দিয়ে পরিচ্ছন্ন ও উচ্চ-পারফরম্যান্স ওয়েব সিস্টেম তৈরি করি।",
      },
      aboutTitle: { type: String, default: "আমার সম্পর্কে" },
      aboutHeadline: {
        type: String,
        default: "পরিচ্ছন্ন, আধুনিক ও ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন নির্মাণে নিবেদিত।",
      },
      aboutParagraphs: {
        type: [String],
        default: [
          "আমি এন্ড-টু-এন্ড ফুল-স্ট্যাক ওয়েব সিস্টেম, মাইক্রোসার্ভিসেস এবং ক্লাউড সমাধান তৈরিতে পারদর্শী।",
          "কোডের স্থায়িত্ব, পারফরম্যান্স এবং ক্লিন ডেভেলপার এক্সপেরিয়েন্স আমার কাজের মূল ভিত্তি।",
          "উচ্চমানের সফটওয়্যার আর্কিটেকচার ও উন্নত ইউজার এক্সপেরিয়েন্স নিশ্চিত করাই আমার লক্ষ্য।",
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
