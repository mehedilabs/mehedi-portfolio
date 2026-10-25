import mongoose, { Schema, Document } from "mongoose";
import { IAssistantQA } from "../types/index.js";

const AssistantQASchema = new Schema<IAssistantQA & Document>(
  {
    category: {
      type: String,
      enum: ["experience", "skills", "freelance", "contact", "architecture"],
      required: true,
      index: true,
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
    en: {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
    bn: {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const AssistantQAModel =
  mongoose.models.AssistantQA ||
  mongoose.model<IAssistantQA & Document>("AssistantQA", AssistantQASchema);

