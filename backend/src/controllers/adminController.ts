import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/auth.js";
import { ProjectModel } from "../models/Project.js";
import { SkillModel } from "../models/Skill.js";
import { BlogPostModel } from "../models/BlogPost.js";
import { MessageModel } from "../models/Message.js";
import { AuditLogModel } from "../models/AuditLog.js";
import { SiteSettingsModel } from "../models/SiteSettings.js";
import { ProfileModel } from "../models/Profile.js";
import { isDatabaseConnected } from "../config/db.js";

/**
 * GET /api/admin/overview
 * Returns high-level metrics and system counts for admin dashboard
 */
export async function getOverview(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!isDatabaseConnected()) {
      res.status(200).json({
        success: true,
        source: "fallback",
        stats: {
          projects: 6,
          skills: 18,
          posts: 2,
          unreadMessages: 0,
          auditLogs: 0,
        },
      });
      return;
    }

    const [projects, skills, posts, unreadMessages, auditLogs] = await Promise.all([
      ProjectModel.countDocuments(),
      SkillModel.countDocuments(),
      BlogPostModel.countDocuments(),
      MessageModel.countDocuments({ isRead: false }),
      AuditLogModel.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        projects,
        skills,
        posts,
        unreadMessages,
        auditLogs,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/admin/audit-logs
 * Retrieves latest security and audit events
 */
export async function getAuditLogs(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!isDatabaseConnected()) {
      res.status(200).json({ success: true, count: 0, data: [] });
      return;
    }

    const limit = Math.min(parseInt(req.query.limit as string) || 30, 100);
    const logs = await AuditLogModel.find().sort({ createdAt: -1 }).limit(limit);

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/admin/settings
 * Retrieves active site settings
 */
export async function getSettings(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!isDatabaseConnected()) {
      res.status(200).json({
        success: true,
        source: "fallback",
        data: {
          siteName: "Mehedi Hasan Portfolio",
          brandTagline: "Full-Stack Development Solutions",
          maintenanceMode: false,
        },
      });
      return;
    }

    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = await SiteSettingsModel.create({});
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/admin/settings
 * Updates global site configuration
 */
export async function updateSettings(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!isDatabaseConnected()) {
      res.status(503).json({
        success: false,
        error: "Database is not connected. Settings cannot be persisted currently.",
      });
      return;
    }

    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = new SiteSettingsModel(req.body);
    } else {
      Object.assign(settings, req.body);
    }

    await settings.save();

    await AuditLogModel.create({
      action: "SETTINGS_UPDATED",
      resource: "SiteSettings",
      userId: req.user?._id?.toString(),
      userEmail: req.user?.email,
      ipAddress: req.ip,
      details: { updatedKeys: Object.keys(req.body) },
    });

    res.status(200).json({
      success: true,
      message: "Site settings updated successfully",
      data: settings,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/admin/profile
 * Retrieves profile data
 */
export async function getProfile(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!isDatabaseConnected()) {
      res.status(200).json({
        success: true,
        source: "fallback",
        data: {
          name: "Mehedi Hasan",
          email: "contact@mehedi.dev",
        },
      });
      return;
    }

    let profile = await ProfileModel.findOne();
    if (!profile) {
      profile = await ProfileModel.create({});
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/admin/profile
 * Updates profile information
 */
export async function updateProfile(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!isDatabaseConnected()) {
      res.status(503).json({
        success: false,
        error: "Database is not connected. Profile cannot be persisted currently.",
      });
      return;
    }

    let profile = await ProfileModel.findOne();
    if (!profile) {
      profile = new ProfileModel(req.body);
    } else {
      Object.assign(profile, req.body);
    }

    await profile.save();

    await AuditLogModel.create({
      action: "PROFILE_UPDATED",
      resource: "Profile",
      userId: req.user?._id?.toString(),
      userEmail: req.user?.email,
      ipAddress: req.ip,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}
