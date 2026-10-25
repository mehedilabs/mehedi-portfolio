import mongoose, { Schema, Document } from "mongoose";
import { IBlogPost } from "../types/index.js";

const LocalizedBlogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { _id: false }
);

const BlogPostSchema = new Schema<IBlogPost & Document>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    publishedAt: { type: Date, default: Date.now, index: true },
    readTime: { type: String, required: true },
    tags: [{ type: String, index: true }],
    coverImage: { type: String },
    isPublished: { type: Boolean, default: true, index: true },
    en: { type: LocalizedBlogSchema, required: true },
    bn: { type: LocalizedBlogSchema, required: true },
  },
  {
    timestamps: true,
  }
);

BlogPostSchema.index({ "en.slug": 1 });
BlogPostSchema.index({ "bn.slug": 1 });

export const BlogPostModel =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost & Document>("BlogPost", BlogPostSchema);

