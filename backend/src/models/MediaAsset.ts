import mongoose, { Document, Schema } from "mongoose";
import { IMediaAsset } from "../types/index.js";

export interface IMediaAssetDocument extends IMediaAsset, Document {}

const MediaAssetSchema = new Schema<IMediaAssetDocument>(
  {
    filename: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    format: {
      type: String,
      default: "png",
    },
    bytes: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    category: {
      type: String,
      enum: ["avatar", "project", "blog", "video", "document", "other"],
      default: "project",
      index: true,
    },
    altText: {
      en: { type: String, default: "" },
      bn: { type: String, default: "" },
    },
    uploadedBy: {
      type: String,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const MediaAssetModel =
  mongoose.models.MediaAsset ||
  mongoose.model<IMediaAssetDocument>("MediaAsset", MediaAssetSchema);
