import { Router, Response, NextFunction } from "express";
import { AuthenticatedRequest, authenticate, requireRole } from "../middleware/auth.js";
import { uploadMiddleware, processUploadedFile, updateResumePdf } from "../services/mediaService.js";
import { MediaAssetModel } from "../models/MediaAsset.js";
import { ProfileModel } from "../models/Profile.js";
import { AuditLogModel } from "../models/AuditLog.js";

const router = Router();

// Protect all media endpoints with authentication
router.use(authenticate);

// Middleware to prevent mutations for demo accounts
function requireMutation(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (req.user?.role === "demo") {
    res.status(403).json({
      success: false,
      error: "Forbidden: Demo accounts have read-only access.",
    });
    return;
  }
  next();
}

/**
 * GET /api/media
 * Retrieve media assets library with optional category filter
 */
router.get("/", async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { category, search } = req.query;
    const query: Record<string, unknown> = {};

    if (category && typeof category === "string" && category !== "all") {
      query.category = category;
    }

    if (search && typeof search === "string") {
      query.filename = { $regex: search, $options: "i" };
    }

    const assets = await MediaAssetModel.find(query).sort({ createdAt: -1 }).limit(100);

    res.status(200).json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/media/upload
 * Direct PC upload for images, thumbnails, and other assets
 */
router.post(
  "/upload",
  requireMutation,
  uploadMiddleware.single("file"),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, error: "No file was uploaded." });
        return;
      }

      const category = (req.body.category || req.query.category || "other") as
        | "avatar"
        | "project"
        | "blog"
        | "video"
        | "document"
        | "other";

      const result = await processUploadedFile(
        req.file,
        category,
        req.user?._id?.toString()
      );

      await AuditLogModel.create({
        action: "MEDIA_UPLOADED",
        resource: "MediaAsset",
        userId: req.user?._id?.toString(),
        userEmail: req.user?.email,
        ipAddress: req.ip,
        details: { filename: result.filename, category: result.category, url: result.url },
      });

      res.status(201).json({
        success: true,
        message: "File uploaded successfully from PC.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/media/upload-resume
 * Direct upload and automatic replacement of Resume/CV PDF
 */
router.post(
  "/upload-resume",
  requireMutation,
  uploadMiddleware.single("resume"),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, error: "Please select a PDF file to upload." });
        return;
      }

      const result = await updateResumePdf(req.file, req.user?._id?.toString());

      await AuditLogModel.create({
        action: "RESUME_PDF_UPDATED",
        resource: "Profile",
        userId: req.user?._id?.toString(),
        userEmail: req.user?.email,
        ipAddress: req.ip,
        details: { resumeUrl: result.url, filename: result.filename },
      });

      res.status(200).json({
        success: true,
        message: "Resume PDF uploaded and public download link updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE /api/media/resume
 * Clears the Resume/CV link from Profile
 */
router.delete(
  "/resume",
  requireMutation,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const profile = await ProfileModel.findOne();
      if (profile) {
        profile.resumeUrl = "";
        await profile.save();
      }

      await AuditLogModel.create({
        action: "RESUME_PDF_REMOVED",
        resource: "Profile",
        userId: req.user?._id?.toString(),
        userEmail: req.user?.email,
        ipAddress: req.ip,
      });

      res.status(200).json({
        success: true,
        message: "Resume link removed. Public download button is now gracefully hidden.",
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE /api/media/:id
 * Delete media asset
 */
router.delete(
  "/:id",
  requireMutation,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const asset = await MediaAssetModel.findById(req.params.id);
      if (!asset) {
        res.status(404).json({ success: false, error: "Media asset not found." });
        return;
      }

      await MediaAssetModel.findByIdAndDelete(req.params.id);

      await AuditLogModel.create({
        action: "MEDIA_DELETED",
        resource: "MediaAsset",
        resourceId: req.params.id,
        userId: req.user?._id?.toString(),
        userEmail: req.user?.email,
        ipAddress: req.ip,
        details: { filename: asset.filename, url: asset.url },
      });

      res.status(200).json({
        success: true,
        message: "Media asset deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

