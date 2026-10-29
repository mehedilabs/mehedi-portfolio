import mongoose, { Schema, Document } from "mongoose";
import { IProject } from "../types/index.js";

const LocalizedProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    tagline: { type: String, default: "", trim: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    metrics: { type: String, default: "" },
    caseStudy: {
      overview: { type: String, default: "" },
      challenge: { type: String, default: "" },
      solution: { type: String, default: "" },
      architecture: { type: String, default: "" },
      results: [{ type: String }],
    },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject & Document>(
  {
    category: {
      type: String,
      enum: ["fullstack", "backend", "cloud", "frontend"],
      required: true,
      index: true,
      default: "fullstack",
    },
    featured: { type: Boolean, default: false, index: true },
    isPublished: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
    thumbnail: { type: String, default: "" },
    techStack: [{ type: String }],
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    en: { type: LocalizedProjectSchema, required: true },
    bn: { type: LocalizedProjectSchema, required: true },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ "en.slug": 1 });
ProjectSchema.index({ "bn.slug": 1 });

export const ProjectModel =
  mongoose.models.Project ||
  mongoose.model<IProject & Document>("Project", ProjectSchema);
