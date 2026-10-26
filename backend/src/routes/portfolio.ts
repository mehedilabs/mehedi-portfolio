import { Router, Request, Response, NextFunction } from "express";
import { ProjectModel } from "../models/Project.js";
import { MessageModel } from "../models/Message.js";
import { SiteSettingsModel } from "../models/SiteSettings.js";
import { ProfileModel } from "../models/Profile.js";
import { AssistantQAModel } from "../models/AssistantQA.js";
import { isDatabaseConnected } from "../config/db.js";
import { contactFormLimiter } from "../middleware/rateLimiter.js";
import { validateBody, messageSchema } from "../validation/schemas.js";

const router = Router();

// Fallback project data for when database is empty or not yet connected
const fallbackProjects = [
  {
    id: "proj-1",
    category: "fullstack",
    featured: true,
    order: 1,
    thumbnail: "",
    techStack: ["Next.js 16", "Express.js", "TypeScript", "MongoDB Atlas", "Tailwind CSS"],
    githubUrl: "https://github.com/mehedilabs/mehedi-portfolio",
    liveUrl: "https://mehedi-portfolio.vercel.app",
    en: {
      title: "Enterprise Portfolio & Monorepo CMS",
      slug: "enterprise-portfolio-monorepo-cms",
      tagline: "High-performance bilingual portfolio with decoupled Express REST API",
      description: "Architecturally disciplined monorepo hosting Next.js 16 and Express.",
    },
    bn: {
      title: "এন্টারপ্রাইজ পোর্টফোলিও ও মনোরেপো সিএমএস",
      slug: "enterprise-portfolio-monorepo-cms",
      tagline: "ডিকাপল্ড Express REST API সহ উচ্চক্ষমতাসম্পন্ন দ্বিভাষিক পোর্টফোলিও",
      description: "Next.js 16 এবং Express.js-এর সমন্বয়ে নির্মিত আধুনিক মনোরেপো আর্কিটেকচার।",
    },
  },
];

/**
 * GET /api/public-settings
 * Publicly consumable site configuration (sections visibility, video showcase, resume link)
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
      { id: "projects", label: "Projects", enabled: true, order: 7 },
      { id: "blog", label: "Blog", enabled: true, order: 8 },
      { id: "contact", label: "Contact", enabled: true, order: 9 },
      { id: "assistant", label: "Chat Assistant", enabled: true, order: 10 },
    ];

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
        videoShowcase: settings?.videoShowcase || {
          videoSourceType: "native-url",
          videoUrl: "/videos/demo-showcase.mp4",
          aspectRatio: "16:10",
          autoPlay: true,
          loop: true,
          muted: true,
        },
        resumeUrl: profile?.resumeUrl || "/documents/resume-mehedi-hasan.pdf",
        avatarUrl: profile?.avatarUrl || "/images/hero-profile.png",
        aboutPhotoUrl: profile?.aboutPhotoUrl || "/images/about-workspace.png",
        availabilityText: profile?.availabilityText || "Available for Senior Roles & Architecture Consulting",
      },
    });
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
    res.status(200).json({ success: true, source: "fallback", data: [] });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/projects
 * List all published projects with optional category filter
 */
router.get("/projects", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;

    if (isDatabaseConnected()) {
      const query: Record<string, unknown> = {
        isPublished: { $ne: false }, // Never leak unpublished draft projects
      };
      if (category && typeof category === "string" && category !== "all") {
        query.category = category;
      }
      const projects = await ProjectModel.find(query).sort({ order: 1, createdAt: -1 });
      if (projects.length > 0) {
        return res.status(200).json({ success: true, count: projects.length, data: projects });
      }
    }

    // Serve structured fallback
    const filtered =
      category && category !== "all"
        ? fallbackProjects.filter((p) => p.category === category)
        : fallbackProjects;

    res.status(200).json({
      success: true,
      source: "fallback",
      count: filtered.length,
      data: filtered,
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

    const fallback = fallbackProjects.find(
      (p) => p.en.slug === slug || p.bn.slug === slug
    );

    if (!fallback) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }

    res.status(200).json({ success: true, source: "fallback", data: fallback });
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
        const created = await MessageModel.create(newMessageData);
        return res.status(201).json({
          success: true,
          message: "Message received and stored in database successfully.",
          data: { id: created._id },
        });
      }

      // In fallback mode when database connection is offline
      res.status(201).json({
        success: true,
        source: "staged",
        message: "Message validated and staged successfully.",
        data: newMessageData,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
