
import path from "node:path";
import fs from "node:fs";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { env } from "../config/env.js";
import { MediaAssetModel } from "../models/MediaAsset.js";
import { ProfileModel } from "../models/Profile.js";

const isProduction =
  process.env.VERCEL === "1" ||
  process.env.NODE_ENV === "production";
const UPLOADS_DIR = path.resolve(process.cwd(), "uploads");

// Local development only: create the local uploads directory.
if (!isProduction && !fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

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

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

const ALLOWED_DOC_TYPES = ["application/pdf"];

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

// Vercel production uses memory storage; local development uses disk.
export const uploadMiddleware = multer({
  storage: isProduction ? multer.memoryStorage() : diskStorage,
  limits: {
    fileSize: 20 * 1024 * 1024,
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

type UploadCategory = UploadResult["category"];

async function uploadBufferToCloudinary(
  file: Express.Multer.File,
  category: UploadCategory
): Promise<Awaited<ReturnType<typeof cloudinary.uploader.upload>>> {
  const resourceType = file.mimetype === "application/pdf" ? "raw" : "image";
  const ext = path.extname(file.originalname).toLowerCase();
  const safeName = path
    .basename(file.originalname, ext)
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .toLowerCase();

  const uniqueName = `${safeName}-${Date.now()}-${Math.round(Math.random() * 1e5)}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `mehedi-portfolio/${category}`,
        resource_type: resourceType,
        public_id:
          resourceType === "raw" ? `${uniqueName}${ext}` : uniqueName,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary returned no upload result."));
          return;
        }

        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
}

/**
 * Uploads to Cloudinary in production.
 * Local development can use disk storage as a fallback.
 */
export async function processUploadedFile(
  file: Express.Multer.File,
  category: UploadCategory = "other",
  uploadedBy?: string
): Promise<UploadResult> {
  const ext = path.extname(file.originalname).replace(".", "").toLowerCase();
  const filename = file.filename || `${Date.now()}-${path.basename(file.originalname)}`;

  let finalUrl = `/uploads/${filename}`;
  let publicId: string | undefined;

  if (isProduction && !isCloudinaryConfigured) {
    throw new Error(
      "Cloudinary is not configured. Please set the Cloudinary environment variables in Vercel."
    );
  }

  if (isCloudinaryConfigured) {
    try {
      const result = file.buffer
        ? await uploadBufferToCloudinary(file, category)
        : await cloudinary.uploader.upload(file.path, {
            folder: `mehedi-portfolio/${category}`,
            resource_type:
              file.mimetype === "application/pdf" ? "raw" : "image",
          });

      finalUrl = result.secure_url;
      publicId = result.public_id;

      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (error) {
      if (isProduction) {
        throw new Error(
          `Cloudinary upload failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }

      console.warn(
        "[MediaService] Cloudinary upload failed; using local storage:",
        error instanceof Error ? error.message : error
      );
    }
  }

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
 * Uploads a PDF resume and updates the profile record.
 */
export async function updateResumePdf(
  file: Express.Multer.File,
  uploadedBy?: string
): Promise<{ url: string; filename: string }> {
  if (file.mimetype !== "application/pdf") {
    throw new Error("Resume must be a valid PDF file.");
  }

  const upload = await processUploadedFile(file, "document", uploadedBy);

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
