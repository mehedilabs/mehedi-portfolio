import mongoose, { Document, Schema } from "mongoose";
import { ICertification } from "../types/index.js";

export interface ICertificationDocument extends ICertification, Document {}

const CertificationSchema = new Schema<ICertificationDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
    credentialUrl: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    en: {
      title: { type: String, required: true },
      description: { type: String, default: "" },
    },
    bn: {
      title: { type: String, required: true },
      description: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

export const CertificationModel =
  mongoose.models.Certification ||
  mongoose.model<ICertificationDocument>("Certification", CertificationSchema);
