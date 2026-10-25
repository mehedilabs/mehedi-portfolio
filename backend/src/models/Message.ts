import mongoose, { Schema, Document } from "mongoose";
import { IMessage } from "../types/index.js";

const MessageSchema = new Schema<IMessage & Document>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    inquiryType: {
      type: String,
      enum: ["job", "freelance", "consulting", "other"],
      default: "job",
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false, index: true },
    isArchived: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
  }
);

export const MessageModel =
  mongoose.models.Message ||
  mongoose.model<IMessage & Document>("Message", MessageSchema);

