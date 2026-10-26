import mongoose, { Document, Schema } from "mongoose";
import { ISession } from "../types/index.js";

export interface ISessionDocument extends Omit<ISession, "_id">, Document {}

const SessionSchema = new Schema<ISessionDocument>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    isValid: {
      type: Boolean,
      default: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: "0s" }, // Automatic MongoDB TTL cleanup when expired
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const SessionModel =
  mongoose.models.Session || mongoose.model<ISessionDocument>("Session", SessionSchema);
