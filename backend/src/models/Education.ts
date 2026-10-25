import mongoose, { Schema, Document } from "mongoose";
import { IEducation } from "../types/index.js";

const LocalizedEduSchema = new Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    courses: [{ type: String }],
  },
  { _id: false }
);

const EducationSchema = new Schema<IEducation & Document>(
  {
    period: { type: String, required: true },
    order: { type: Number, default: 0, index: true },
    en: { type: LocalizedEduSchema, required: true },
    bn: { type: LocalizedEduSchema, required: true },
  },
  {
    timestamps: true,
  }
);

export const EducationModel =
  mongoose.models.Education ||
  mongoose.model<IEducation & Document>("Education", EducationSchema);

