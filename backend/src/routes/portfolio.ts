import { Router, Request, Response, NextFunction } from "express";
import { ProjectModel } from "../models/Project.js";
import { MessageModel } from "../models/Message.js";
import { isDatabaseConnected } from "../config/db.js";

const router = Router();

// Fallback project data for when database is empty or not yet connected
const fallbackProjects = [
  {
    id: "proj-1",
    category: "fullstack",
    featured: true,
    order: 1,
    thumbnail: "/images/projects/distributed-cms.png",
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
 * GET /api/projects
 * List all projects with optional category filter
 */
router.get("/projects", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;

    if (isDatabaseConnected()) {
      const query: Record<string, unknown> = {};
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
 * Validate and stage contact inquiry messages
 */
router.post("/messages", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, subject, inquiryType, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, email, subject, and message are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address format.",
      });
    }

    const newMessageData = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: String(subject).trim(),
      inquiryType: inquiryType || "job",
      message: String(message).trim(),
      isRead: false,
      isArchived: false,
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

    // In fallback mode when database connection is pending
    console.log("[Message Staged]", newMessageData);
    res.status(201).json({
      success: true,
      source: "staged",
      message: "Message validated and staged successfully.",
      data: newMessageData,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
