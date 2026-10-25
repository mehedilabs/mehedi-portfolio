import mongoose, { Schema, Document } from "mongoose";
import { IProject } from "../types/index.js";

const LocalizedProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    metrics: { type: String },
    caseStudy: {
      overview: { type: String },
      challenge: { type: String },
      solution: { type: String },
      architecture: { type: String },
      results: [{ type: String }],
    },
    seoTitle: { type: String },
    seoDescription: { type: String },
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
    },
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0, index: true },
    thumbnail: { type: String, required: true },
    techStack: [{ type: String, required: true }],
    githubUrl: { type: String },
    liveUrl: { type: String },
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
