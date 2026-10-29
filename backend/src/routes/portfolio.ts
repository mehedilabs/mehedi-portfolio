import { Router, Request, Response, NextFunction } from "express";
import { ProjectModel } from "../models/Project.js";
import { BlogPostModel } from "../models/BlogPost.js";
import { MessageModel } from "../models/Message.js";
import { SiteSettingsModel } from "../models/SiteSettings.js";
import { ProfileModel } from "../models/Profile.js";
import { AssistantQAModel } from "../models/AssistantQA.js";
import { ExperienceModel } from "../models/Experience.js";
import { EducationModel } from "../models/Education.js";
import { CertificationModel } from "../models/Certification.js";
import { isDatabaseConnected } from "../config/db.js";
import { contactFormLimiter } from "../middleware/rateLimiter.js";
import { validateBody, messageSchema } from "../validation/schemas.js";

const router = Router();

/**
 * GET /api/public-settings
 * Publicly consumable site configuration (sections visibility, video showcase, resume link, profile)
 */
router.get("/public-settings", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let settings = null;
    let profile = null;

    if (isDatabaseConnected()) {
      [settings, profile] = await Promise.all([
        SiteSettingsModel.findOne(),
        ProfileModel.findOne(),
      ]);
    }

    const defaultSections = [
      { id: "hero", label: "Hero", enabled: true, order: 1 },
      { id: "about", label: "About", enabled: true, order: 2 },
      { id: "skills", label: "Skills", enabled: true, order: 3 },
      { id: "videoShowcase", label: "Video Showcase", enabled: true, order: 4 },
      { id: "experience", label: "Experience", enabled: true, order: 5 },
      { id: "education", label: "Education", enabled: true, order: 6 },
      { id: "projects", label: "Featured Projects", enabled: true, order: 7 },
      { id: "blog", label: "Technical Insights", enabled: true, order: 8 },
      { id: "contact", label: "Contact", enabled: true, order: 9 },
      { id: "assistant", label: "Chat Assistant", enabled: true, order: 10 },
    ];

    const rawVideoShowcase = settings?.videoShowcase;
    const sanitizedVideoUrl =
      rawVideoShowcase?.videoUrl === "/videos/demo-showcase.mp4"
        ? ""
        : rawVideoShowcase?.videoUrl || "";

    res.status(200).json({
      success: true,
      data: {
        siteName: settings?.siteName || "Mehedi Hasan Portfolio",
        brandTagline: settings?.brandTagline || "Full-Stack Development Solutions",
        sections: settings?.sections && settings.sections.length > 0 ? settings.sections : defaultSections,
        activeSections: settings?.activeSections || {
          hero: true,
          about: true,
          skills: true,
          videoShowcase: true,
          projects: true,
          experience: true,
          education: true,
          blog: true,
          contact: true,
          assistant: true,
        },
        videoShowcase: {
          videoSourceType: rawVideoShowcase?.videoSourceType || "google-drive",
          googleDriveSharingUrl: rawVideoShowcase?.googleDriveSharingUrl || "",
          googleDriveFileId: rawVideoShowcase?.googleDriveFileId || "",
          videoUrl: sanitizedVideoUrl,
          posterUrl: rawVideoShowcase?.posterUrl || "",
          aspectRatio: rawVideoShowcase?.aspectRatio || "16:10",
          autoPlay: rawVideoShowcase?.autoPlay ?? false,
          loop: rawVideoShowcase?.loop ?? false,
          muted: rawVideoShowcase?.muted ?? true,
          en: rawVideoShowcase?.en || {
            badge: "04. SYSTEM_DEMO",
            headingHighlight: "Full-Stack",
            headingNormal: "Development Solutions",
            subheading: "High-performance architecture in action",
          },
          bn: rawVideoShowcase?.bn || {
            badge: "০৪. সিস্টেম ডেমো",
            headingHighlight: "সিস্টেম আর্কিটেকচার",
            headingNormal: "ডেভেলপমেন্ট সল্যুশনস",
            subheading: "সিস্টেমের বাস্তব কর্মক্ষমতা",
          },
        },
        resumeUrl: profile?.resumeUrl ?? "/documents/resume-mehedi-hasan.pdf",
        avatarUrl: profile?.avatarUrl || "/images/hero-profile.png",
        avatarAlt: profile?.avatarAlt || "Mehedi Hasan — Profile Photo",
        aboutPhotoUrl: profile?.aboutPhotoUrl || "/images/about-workspace.png",
        aboutPhotoAlt: profile?.aboutPhotoAlt || "Mehedi Hasan — Developer Workspace",
        availabilityText: profile?.availabilityText || "Available for Senior Roles & Architecture Consulting",
        profile: profile
          ? {
              name: profile.name,
              email: profile.email,
              phone: profile.phone,
              location: profile.location,
              avatarUrl: profile.avatarUrl,
              avatarAlt: profile.avatarAlt,
              aboutPhotoUrl: profile.aboutPhotoUrl,
              aboutPhotoAlt: profile.aboutPhotoAlt,
              resumeUrl: profile.resumeUrl,
              availabilityText: profile.availabilityText,
              socialLinks: profile.socialLinks,
              en: profile.en,
              bn: profile.bn,
            }
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/projects
 * List all published projects with optional category filter.
 * Persisted CMS content is the sole source of truth.
 */
router.get("/projects", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;

    if (isDatabaseConnected()) {
      const query: Record<string, unknown> = {
        isPublished: { $ne: false },
      };
      if (category && typeof category === "string" && category !== "all") {
        query.category = category;
      }
      const projects = await ProjectModel.find(query).sort({ order: 1, createdAt: -1 });
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    }

    res.status(200).json({
      success: true,
      count: 0,
      data: [],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/projects/:slug
 * Retrieve project by localized slug (en or bn)
 */
router.get("/projects/:slug", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    if (isDatabaseConnected()) {
      const project = await ProjectModel.findOne({
        isPublished: { $ne: false },
        $or: [{ "en.slug": slug }, { "bn.slug": slug }],
      });
      if (project) {
        return res.status(200).json({ success: true, data: project });
      }
    }

    return res.status(404).json({ success: false, error: "Project not found" });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/blog
 * List all published blog articles.
 * Persisted CMS content is the sole source of truth.
 */
router.get("/blog", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isDatabaseConnected()) {
      const posts = await BlogPostModel.find({ isPublished: { $ne: false } }).sort({ publishedAt: -1, createdAt: -1 });
      return res.status(200).json({ success: true, count: posts.length, data: posts });
    }

    res.status(200).json({
      success: true,
      count: 0,
      data: [],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/blog/:slug
 * Retrieve blog post by slug
 */
router.get("/blog/:slug", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    if (isDatabaseConnected()) {
      const post = await BlogPostModel.findOne({
        slug,
        isPublished: { $ne: false },
      });
      if (post) {
        return res.status(200).json({ success: true, data: post });
      }
    }

    return res.status(404).json({ success: false, error: "Blog post not found" });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/experience
 * Professional career trajectory items
 */
router.get("/experience", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isDatabaseConnected()) {
      const list = await ExperienceModel.find().sort({ order: 1, createdAt: -1 });
      return res.status(200).json({ success: true, count: list.length, data: list });
    }
    res.status(200).json({ success: true, count: 0, data: [] });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/education
 * Academic degrees and institutions
 */
router.get("/education", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isDatabaseConnected()) {
      const list = await EducationModel.find().sort({ order: 1, createdAt: -1 });
      return res.status(200).json({ success: true, count: list.length, data: list });
    }
    res.status(200).json({ success: true, count: 0, data: [] });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/certifications
 * Professional certifications and licenses
 */
router.get("/certifications", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isDatabaseConnected()) {
      const list = await CertificationModel.find().sort({ order: 1, createdAt: -1 });
      return res.status(200).json({ success: true, count: list.length, data: list });
    }
    res.status(200).json({ success: true, count: 0, data: [] });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/assistant-qa
 * Predefined Q&A pairs for the floating chat assistant
 */
router.get("/assistant-qa", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isDatabaseConnected()) {
      const qas = await AssistantQAModel.find({ isActive: true }).sort({ order: 1 });
      if (qas.length > 0) {
        return res.status(200).json({ success: true, count: qas.length, data: qas });
      }
    }
    res.status(200).json({ success: true, count: 0, data: [] });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/messages
 * Validate, rate-limit, and store contact inquiry messages
 */
router.post(
  "/messages",
  contactFormLimiter,
  validateBody(messageSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, subject, inquiryType, message } = req.body;

      const newMessageData = {
        name,
        email,
        subject,
        inquiryType: inquiryType || "job",
        message,
        isRead: false,
        isArchived: false,
        ipAddress: req.ip,
        createdAt: new Date(),
      };

      if (isDatabaseConnected()) {
        const savedMessage = await MessageModel.create(newMessageData);
        return res.status(201).json({
          success: true,
          message: "Thank you for reaching out! Your message has been received.",
          data: {
            id: savedMessage._id,
            timestamp: savedMessage.createdAt,
          },
        });
      }

      // Offline mock fallback
      res.status(201).json({
        success: true,
        message: "Message processed (offline simulation).",
        data: {
          id: "simulated-" + Date.now(),
          timestamp: new Date(),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
