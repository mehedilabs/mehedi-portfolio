import mongoose, { Schema, Document } from "mongoose";
import { ISkill } from "../types/index.js";

const SkillSchema = new Schema<ISkill & Document>(
  {
    category: {
      type: String,
      enum: ["frontend", "backend", "database", "cloud", "tools"],
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    iconName: { type: String, required: true },
    highlight: { type: Boolean, default: false },
    order: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
  }
);

export const SkillModel =
  mongoose.models.Skill ||
  mongoose.model<ISkill & Document>("Skill", SkillSchema);
