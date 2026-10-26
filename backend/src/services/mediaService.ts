import path from "node:path";
import fs from "node:fs";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { env } from "../config/env.js";
import { MediaAssetModel } from "../models/MediaAsset.js";
import { ProfileModel } from "../models/Profile.js";

// Ensure local uploads directory exists
const UPLOADS_DIR = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure Cloudinary if credentials are provided
const isCloudinaryConfigured = Boolean(
  env.CLOUDINARY_CLOUD_NAME &&
  env.CLOUDINARY_API_KEY &&
  env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

// Allowed MIME types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const ALLOWED_DOC_TYPES = ["application/pdf"];

// Multer Storage: Disk storage fallback
const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  },
});

export const uploadMiddleware = multer({
  storage: diskStorage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB max
  },
  fileFilter: (_req, file, cb) => {
    if (
      ALLOWED_IMAGE_TYPES.includes(file.mimetype) ||
      ALLOWED_DOC_TYPES.includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Unsupported file format. Please upload JPEG, PNG, WebP, GIF, SVG, or PDF files only."
        )
      );
    }
  },
});

export interface UploadResult {
  url: string;
  publicId?: string;
  filename: string;
  format: string;
  bytes: number;
  category: "avatar" | "project" | "blog" | "video" | "document" | "other";
}

/**
 * Uploads a local file to Cloudinary if configured, or keeps local storage
 */
export async function processUploadedFile(
  file: Express.Multer.File,
  category: "avatar" | "project" | "blog" | "video" | "document" | "other" = "other",
  uploadedBy?: string
): Promise<UploadResult> {
  const ext = path.extname(file.originalname).replace(".", "").toLowerCase();
  let finalUrl = `/uploads/${file.filename}`;
  let publicId: string | undefined = undefined;

  if (isCloudinaryConfigured) {
    try {
      const resourceType = file.mimetype === "application/pdf" ? "raw" : "image";
      const result = await cloudinary.uploader.upload(file.path, {
        folder: `mehedi-portfolio/${category}`,
        resource_type: resourceType,
      });

      finalUrl = result.secure_url;
      publicId = result.public_id;

      // Clean up local temp file after Cloudinary upload
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (err) {
      console.warn(
        "[MediaService] Cloudinary upload failed, falling back to local storage:",
        err instanceof Error ? err.message : err
      );
    }
  }

  // Create database record
  await MediaAssetModel.create({
    filename: file.originalname,
    publicId,
    url: finalUrl,
    format: ext || "file",
    bytes: file.size,
    category,
    uploadedBy,
  });

  return {
    url: finalUrl,
    publicId,
    filename: file.originalname,
    format: ext,
    bytes: file.size,
    category,
  };
}

/**
 * Handles Resume/CV PDF upload: saves asset and immediately updates Profile.resumeUrl
 */
export async function updateResumePdf(
  file: Express.Multer.File,
  uploadedBy?: string
): Promise<{ url: string; filename: string }> {
  if (file.mimetype !== "application/pdf") {
    throw new Error("Resume must be a valid PDF file.");
  }

  const upload = await processUploadedFile(file, "document", uploadedBy);

  // Update Profile record
  let profile = await ProfileModel.findOne();
  if (!profile) {
    profile = await ProfileModel.create({});
  }

  profile.resumeUrl = upload.url;
  await profile.save();

  return {
    url: upload.url,
    filename: upload.filename,
  };
}

