import mongoose, { Schema, Document } from "mongoose";
import { IExperience } from "../types/index.js";

const LocalizedExpSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    achievements: [{ type: String }],
  },
  { _id: false }
);

const ExperienceSchema = new Schema<IExperience & Document>(
  {
    period: { type: String, required: true },
    current: { type: Boolean, default: false },
    techStack: [{ type: String, required: true }],
    order: { type: Number, default: 0, index: true },
    en: { type: LocalizedExpSchema, required: true },
    bn: { type: LocalizedExpSchema, required: true },
  },
  {
    timestamps: true,
  }
);

export const ExperienceModel =
  mongoose.models.Experience ||
  mongoose.model<IExperience & Document>("Experience", ExperienceSchema);
