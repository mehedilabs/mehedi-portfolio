import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/auth.js";
import { ProjectModel } from "../models/Project.js";
import { SkillModel } from "../models/Skill.js";
import { BlogPostModel } from "../models/BlogPost.js";
import { MessageModel } from "../models/Message.js";
import { AuditLogModel } from "../models/AuditLog.js";
import { SiteSettingsModel } from "../models/SiteSettings.js";
import { ProfileModel } from "../models/Profile.js";
import { ExperienceModel } from "../models/Experience.js";
import { EducationModel } from "../models/Education.js";
import { CertificationModel } from "../models/Certification.js";
import { AssistantQAModel } from "../models/AssistantQA.js";
import { MediaAssetModel } from "../models/MediaAsset.js";
import { isDatabaseConnected } from "../config/db.js";
import { parseGoogleDriveUrl } from "../utils/googleDrive.js";

// Helper to check demo mode
export function checkDemoRestriction(req: AuthenticatedRequest, res: Response): boolean {
  if (req.user?.role === "demo") {
    res.status(403).json({
      success: false,
      error: "Forbidden: Recruiter Demo account has read-only access. Mutations are disabled.",
    });
    return true;
  }
  return false;
}

// ------------------------------------------------------------------------------
// Dashboard Overview
// ------------------------------------------------------------------------------
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
          mediaAssets: 0,
        },
      });
      return;
    }

    const [projects, skills, posts, unreadMessages, auditLogs, mediaAssets] = await Promise.all([
      ProjectModel.countDocuments(),
      SkillModel.countDocuments(),
      BlogPostModel.countDocuments(),
      MessageModel.countDocuments({ isRead: false }),
      AuditLogModel.countDocuments(),
      MediaAssetModel.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        projects,
        skills,
        posts,
        unreadMessages,
        auditLogs,
        mediaAssets,
      },
    });
  } catch (error) {
    next(error);
  }
}

// ------------------------------------------------------------------------------
// Section Visibility & Order Management (Critical Requirement)
// ------------------------------------------------------------------------------
export async function getSections(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = await SiteSettingsModel.create({});
    }

    res.status(200).json({
      success: true,
      data: settings.sections || [],
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSections(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    const { sections } = req.body;
    if (!Array.isArray(sections)) {
      res.status(400).json({ success: false, error: "Sections must be an array of section items." });
      return;
    }

    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = new SiteSettingsModel();
    }

    settings.sections = sections;

    // Synchronize activeSections map for fast lookup
    const activeMap: Record<string, boolean> = {};
    for (const sec of sections) {
      activeMap[sec.id] = sec.enabled;
    }
    settings.activeSections = activeMap;

    await settings.save();

    await AuditLogModel.create({
      action: "SECTIONS_UPDATED",
      resource: "SiteSettings",
      userId: req.user?._id?.toString(),
      userEmail: req.user?.email,
      ipAddress: req.ip,
      details: { sectionsCount: sections.length },
    });

    res.status(200).json({
      success: true,
      message: "Section visibility and ordering persisted successfully.",
      data: settings.sections,
    });
  } catch (error) {
    next(error);
  }
}

// ------------------------------------------------------------------------------
// Video Showcase Settings (Google Drive Link Management)
// ------------------------------------------------------------------------------
export async function getVideoShowcaseSettings(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = await SiteSettingsModel.create({});
    }

    res.status(200).json({
      success: true,
      data: settings.videoShowcase,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateVideoShowcaseSettings(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    const {
      videoSourceType,
      googleDriveSharingUrl,
      videoUrl,
      posterUrl,
      aspectRatio,
      autoPlay,
      loop,
      muted,
      en,
      bn,
    } = req.body;

    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = new SiteSettingsModel();
    }

    let googleDriveFileId = "";

    // Validate Google Drive link if provided
    if (googleDriveSharingUrl && googleDriveSharingUrl.trim().length > 0) {
      const parsed = parseGoogleDriveUrl(googleDriveSharingUrl);
      if (!parsed.isValid) {
        res.status(400).json({
          success: false,
          error: parsed.error || "Invalid Google Drive sharing URL.",
        });
        return;
      }
      googleDriveFileId = parsed.fileId || "";
    }

    const determinedSourceType = googleDriveFileId
      ? "google-drive"
      : (videoSourceType === "google-drive" ? "google-drive" : "native-url");

    settings.videoShowcase = {
      videoSourceType: determinedSourceType,
      googleDriveSharingUrl: googleDriveSharingUrl || "",
      googleDriveFileId,
      videoUrl: determinedSourceType === "google-drive" ? "" : (videoUrl || ""),
      posterUrl: posterUrl !== undefined ? posterUrl : settings.videoShowcase?.posterUrl || "",
      aspectRatio: aspectRatio || "16:10",
      autoPlay: autoPlay !== undefined ? autoPlay : true,
      loop: loop !== undefined ? loop : true,
      muted: muted !== undefined ? muted : true,
      en: {
        badge: en?.badge || "04. SYSTEM_DEMO",
        headingHighlight: en?.headingHighlight || "Full-Stack",
        headingNormal: en?.headingNormal || "Development Solutions",
        subheading: en?.subheading || "",
      },
      bn: {
        badge: bn?.badge || "০৪. সিস্টেম ডেমো",
        headingHighlight: bn?.headingHighlight || "সিস্টেম আর্কিটেকচার",
        headingNormal: bn?.headingNormal || "ডেভেলপমেন্ট সল্যুশনস",
        subheading: bn?.subheading || "",
      },
    };

    await settings.save();

    await AuditLogModel.create({
      action: "VIDEO_SHOWCASE_UPDATED",
      resource: "SiteSettings",
      userId: req.user?._id?.toString(),
      userEmail: req.user?.email,
      ipAddress: req.ip,
      details: {
        videoSourceType: settings.videoShowcase.videoSourceType,
        googleDriveFileId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Video showcase configuration updated successfully.",
      data: settings.videoShowcase,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeShowcaseVideo(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    const settings = await SiteSettingsModel.findOne();
    if (settings) {
      settings.videoShowcase.googleDriveSharingUrl = "";
      settings.videoShowcase.googleDriveFileId = "";
      settings.videoShowcase.videoSourceType = "native-url";
      settings.videoShowcase.videoUrl = "";
      await settings.save();
    }

    await AuditLogModel.create({
      action: "SHOWCASE_VIDEO_RESET",
      resource: "SiteSettings",
      userId: req.user?._id?.toString(),
      userEmail: req.user?.email,
      ipAddress: req.ip,
    });

    res.status(200).json({
      success: true,
      message: "Video removed successfully.",
    });
  } catch (error) {
    next(error);
  }
}

// ------------------------------------------------------------------------------
// Projects Management (CRUD)
// ------------------------------------------------------------------------------
export async function getProjects(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const projects = await ProjectModel.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
}

export async function createProject(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    const body = { ...req.body };

    if (!body.en || !body.en.title || !body.en.description) {
      res.status(400).json({
        success: false,
        error: "English project title and description are required.",
      });
      return;
    }

    if (!body.en.slug) {
      body.en.slug = body.en.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }

    if (!body.bn) {
      body.bn = {
        title: body.en.title,
        slug: body.en.slug,
        tagline: body.en.tagline || "",
        description: body.en.description,
      };
    } else {
      if (!body.bn.title) body.bn.title = body.en.title;
      if (!body.bn.slug) body.bn.slug = body.en.slug;
      if (!body.bn.description) body.bn.description = body.en.description;
      if (body.bn.tagline === undefined) body.bn.tagline = body.en.tagline || "";
    }

    if (typeof body.techStack === "string") {
      body.techStack = body.techStack.split(",").map((s: string) => s.trim()).filter(Boolean);
    } else if (!Array.isArray(body.techStack)) {
      body.techStack = [];
    }

    if (body.isPublished === undefined) {
      body.isPublished = true;
    }

    const project = await ProjectModel.create(body);

    await AuditLogModel.create({
      action: "PROJECT_CREATED",
      resource: "Project",
      resourceId: project._id.toString(),
      userId: req.user?._id?.toString(),
      userEmail: req.user?.email,
      ipAddress: req.ip,
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

export async function updateProject(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    const body = { ...req.body };
    if (typeof body.techStack === "string") {
      body.techStack = body.techStack.split(",").map((s: string) => s.trim()).filter(Boolean);
    }

    if (body.en && !body.en.slug && body.en.title) {
      body.en.slug = body.en.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    if (body.bn && !body.bn.slug && body.en?.slug) {
      body.bn.slug = body.en.slug;
    }

    const project = await ProjectModel.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      res.status(404).json({ success: false, error: "Project not found." });
      return;
    }

    await AuditLogModel.create({
      action: "PROJECT_UPDATED",
      resource: "Project",
      resourceId: project._id.toString(),
      userId: req.user?._id?.toString(),
      userEmail: req.user?.email,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    const project = await ProjectModel.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, error: "Project not found." });
      return;
    }

    await AuditLogModel.create({
      action: "PROJECT_DELETED",
      resource: "Project",
      resourceId: req.params.id,
      userId: req.user?._id?.toString(),
      userEmail: req.user?.email,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    next(error);
  }
}

export async function toggleProjectPublish(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    const project = await ProjectModel.findById(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, error: "Project not found." });
      return;
    }

    project.isPublished = !project.isPublished;
    await project.save();

    res.status(200).json({
      success: true,
      isPublished: project.isPublished,
      message: `Project ${project.isPublished ? "published" : "unpublished"}.`,
    });
  } catch (error) {
    next(error);
  }
}

// ------------------------------------------------------------------------------
// Skills Management (CRUD)
// ------------------------------------------------------------------------------
export async function getSkills(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const skills = await SkillModel.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    next(error);
  }
}

export async function createSkill(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    const skill = await SkillModel.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
}

export async function updateSkill(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    const skill = await SkillModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      res.status(404).json({ success: false, error: "Skill not found." });
      return;
    }
    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
}

export async function deleteSkill(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    await SkillModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Skill removed." });
  } catch (error) {
    next(error);
  }
}

// ------------------------------------------------------------------------------
// Career: Experience, Education, Certifications
// ------------------------------------------------------------------------------
export async function getExperience(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const list = await ExperienceModel.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
}

export async function createExperience(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const item = await ExperienceModel.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function updateExperience(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const item = await ExperienceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function deleteExperience(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    await ExperienceModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Experience record deleted." });
  } catch (error) {
    next(error);
  }
}

// Education
export async function getEducation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const list = await EducationModel.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
}

export async function createEducation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const item = await EducationModel.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function updateEducation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const item = await EducationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function deleteEducation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    await EducationModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Education record deleted." });
  } catch (error) {
    next(error);
  }
}

// Certifications
export async function getCertifications(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const list = await CertificationModel.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
}

export async function createCertification(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const item = await CertificationModel.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function updateCertification(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const item = await CertificationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function deleteCertification(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    await CertificationModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Certification record deleted." });
  } catch (error) {
    next(error);
  }
}

// ------------------------------------------------------------------------------
// Blog Posts Management
// ------------------------------------------------------------------------------
export async function getBlogPosts(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const posts = await BlogPostModel.find().sort({ publishedAt: -1, createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
}

export async function createBlogPost(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const post = await BlogPostModel.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
}

export async function updateBlogPost(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const post = await BlogPostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      res.status(404).json({ success: false, error: "Blog post not found." });
      return;
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
}

export async function deleteBlogPost(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    await BlogPostModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Blog post deleted." });
  } catch (error) {
    next(error);
  }
}

// ------------------------------------------------------------------------------
// Contact Messages / Inbox Management
// ------------------------------------------------------------------------------
export async function getMessages(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { isRead, isArchived, search } = req.query;
    const query: Record<string, unknown> = {};

    if (isRead !== undefined) {
      query.isRead = isRead === "true";
    }
    if (isArchived !== undefined) {
      query.isArchived = isArchived === "true";
    }
    if (search && typeof search === "string") {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const messages = await MessageModel.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
}

export async function toggleMessageRead(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const msg = await MessageModel.findById(req.params.id);
    if (!msg) {
      res.status(404).json({ success: false, error: "Message not found." });
      return;
    }
    msg.isRead = !msg.isRead;
    await msg.save();
    res.status(200).json({ success: true, isRead: msg.isRead });
  } catch (error) {
    next(error);
  }
}

export async function toggleMessageArchived(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const msg = await MessageModel.findById(req.params.id);
    if (!msg) {
      res.status(404).json({ success: false, error: "Message not found." });
      return;
    }
    msg.isArchived = !msg.isArchived;
    await msg.save();
    res.status(200).json({ success: true, isArchived: msg.isArchived });
  } catch (error) {
    next(error);
  }
}

export async function deleteMessage(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    await MessageModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Message deleted from inbox." });
  } catch (error) {
    next(error);
  }
}

// ------------------------------------------------------------------------------
// Assistant Q&A Management
// ------------------------------------------------------------------------------
export async function getAssistantQA(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const list = await AssistantQAModel.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
}

export async function createAssistantQA(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const qa = await AssistantQAModel.create(req.body);
    res.status(201).json({ success: true, data: qa });
  } catch (error) {
    next(error);
  }
}

export async function updateAssistantQA(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    const qa = await AssistantQAModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!qa) {
      res.status(404).json({ success: false, error: "Q&A record not found." });
      return;
    }
    res.status(200).json({ success: true, data: qa });
  } catch (error) {
    next(error);
  }
}

export async function deleteAssistantQA(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;
    await AssistantQAModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Q&A record deleted." });
  } catch (error) {
    next(error);
  }
}

// ------------------------------------------------------------------------------
// Profile & Settings
// ------------------------------------------------------------------------------
export async function getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    let profile = await ProfileModel.findOne();
    if (!profile) {
      profile = await ProfileModel.create({});
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    let profile = await ProfileModel.findOne();
    if (!profile) {
      profile = new ProfileModel(req.body);
    } else {
      if (req.body.name !== undefined && req.body.name !== "") profile.name = req.body.name;
      if (req.body.email !== undefined && req.body.email !== "") profile.email = req.body.email;
      if (req.body.phone !== undefined) profile.phone = req.body.phone;
      if (req.body.location !== undefined) profile.location = req.body.location;

      // Safe partial image updates: preserve existing photo if incoming is empty/whitespace
      if (req.body.avatarUrl !== undefined && req.body.avatarUrl.trim() !== "") {
        profile.avatarUrl = req.body.avatarUrl;
      }
      if (req.body.avatarAlt !== undefined) profile.avatarAlt = req.body.avatarAlt;

      if (req.body.aboutPhotoUrl !== undefined && req.body.aboutPhotoUrl.trim() !== "") {
        profile.aboutPhotoUrl = req.body.aboutPhotoUrl;
      }
      if (req.body.aboutPhotoAlt !== undefined) profile.aboutPhotoAlt = req.body.aboutPhotoAlt;

      if (req.body.resumeUrl !== undefined) profile.resumeUrl = req.body.resumeUrl;
      if (req.body.availabilityText !== undefined) profile.availabilityText = req.body.availabilityText;

      // Safe partial update for social links
      if (req.body.socialLinks && typeof req.body.socialLinks === "object") {
        if (!profile.socialLinks) profile.socialLinks = {};
        if (req.body.socialLinks.github !== undefined) profile.socialLinks.github = req.body.socialLinks.github;
        if (req.body.socialLinks.linkedin !== undefined) profile.socialLinks.linkedin = req.body.socialLinks.linkedin;
        if (req.body.socialLinks.twitter !== undefined) profile.socialLinks.twitter = req.body.socialLinks.twitter;
        if (req.body.socialLinks.youtube !== undefined) profile.socialLinks.youtube = req.body.socialLinks.youtube;
      }

      // Safe partial update for English localized sub-document
      if (req.body.en && typeof req.body.en === "object") {
        if (!profile.en) profile.en = {};
        if (req.body.en.title !== undefined) profile.en.title = req.body.en.title;
        if (req.body.en.greeting !== undefined) profile.en.greeting = req.body.en.greeting;
        if (req.body.en.bio !== undefined) profile.en.bio = req.body.en.bio;
        if (req.body.en.summary !== undefined) profile.en.summary = req.body.en.summary;
        if (req.body.en.aboutTitle !== undefined) profile.en.aboutTitle = req.body.en.aboutTitle;
        if (req.body.en.aboutHeadline !== undefined) profile.en.aboutHeadline = req.body.en.aboutHeadline;
        if (req.body.en.aboutParagraphs !== undefined && Array.isArray(req.body.en.aboutParagraphs)) {
          profile.en.aboutParagraphs = req.body.en.aboutParagraphs;
        }
      }

      // Safe partial update for Bangla localized sub-document
      if (req.body.bn && typeof req.body.bn === "object") {
        if (!profile.bn) profile.bn = {};
        if (req.body.bn.title !== undefined) profile.bn.title = req.body.bn.title;
        if (req.body.bn.greeting !== undefined) profile.bn.greeting = req.body.bn.greeting;
        if (req.body.bn.bio !== undefined) profile.bn.bio = req.body.bn.bio;
        if (req.body.bn.summary !== undefined) profile.bn.summary = req.body.bn.summary;
        if (req.body.bn.aboutTitle !== undefined) profile.bn.aboutTitle = req.body.bn.aboutTitle;
        if (req.body.bn.aboutHeadline !== undefined) profile.bn.aboutHeadline = req.body.bn.aboutHeadline;
        if (req.body.bn.aboutParagraphs !== undefined && Array.isArray(req.body.bn.aboutParagraphs)) {
          profile.bn.aboutParagraphs = req.body.bn.aboutParagraphs;
        }
      }
    }
    await profile.save();

    res.status(200).json({ success: true, message: "Profile updated successfully.", data: profile });
  } catch (error) {
    next(error);
  }
}

export async function getSettings(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = await SiteSettingsModel.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

export async function updateSettings(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (checkDemoRestriction(req, res)) return;

    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = new SiteSettingsModel(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();

    res.status(200).json({ success: true, message: "Settings saved successfully.", data: settings });
  } catch (error) {
    next(error);
  }
}

export async function getAuditLogs(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 30, 100);
    const logs = await AuditLogModel.find().sort({ createdAt: -1 }).limit(limit);
    res.status(200).json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    next(error);
  }
}
