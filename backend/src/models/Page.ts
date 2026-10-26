import mongoose, { Document, Schema } from "mongoose";
import { IPage } from "../types/index.js";

export interface IPageDocument extends Omit<IPage, "_id">, Document {}

const PageSchema = new Schema<IPageDocument>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    en: {
      title: { type: String, required: true },
      content: { type: String, default: "" },
      seoTitle: { type: String },
      seoDescription: { type: String },
    },
    bn: {
      title: { type: String, required: true },
      content: { type: String, default: "" },
      seoTitle: { type: String },
      seoDescription: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const PageModel =
  mongoose.models.Page || mongoose.model<IPageDocument>("Page", PageSchema);
