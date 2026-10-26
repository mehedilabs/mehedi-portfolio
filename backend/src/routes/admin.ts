import { Router } from "express";
import {
  getOverview,
  getAuditLogs,
  getSettings,
  updateSettings,
  getProfile,
  updateProfile,
  getSections,
  updateSections,
  getVideoShowcaseSettings,
  updateVideoShowcaseSettings,
  removeShowcaseVideo,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  toggleProjectPublish,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  getEducation,
  createEducation,
  deleteEducation,
  getCertifications,
  createCertification,
  deleteCertification,
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getMessages,
  toggleMessageRead,
  toggleMessageArchived,
  deleteMessage,
  getAssistantQA,
  createAssistantQA,
  updateAssistantQA,
  deleteAssistantQA,
} from "../controllers/adminController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// Protect all admin routes with authentication
router.use(authenticate);

// Overview & Audit
router.get("/overview", getOverview);
router.get("/audit-logs", getAuditLogs);

// Section Visibility & Ordering
router.get("/sections", getSections);
router.put("/sections", updateSections);

// Video Showcase
router.get("/video-showcase", getVideoShowcaseSettings);
router.put("/video-showcase", updateVideoShowcaseSettings);
router.delete("/video-showcase/video", removeShowcaseVideo);

// Profile
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

// Settings
router.get("/settings", getSettings);
router.put("/settings", updateSettings);

// Projects
router.get("/projects", getProjects);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);
router.patch("/projects/:id/toggle-publish", toggleProjectPublish);

// Skills
router.get("/skills", getSkills);
router.post("/skills", createSkill);
router.put("/skills/:id", updateSkill);
router.delete("/skills/:id", deleteSkill);

// Career: Experience, Education, Certifications
router.get("/experience", getExperience);
router.post("/experience", createExperience);
router.put("/experience/:id", updateExperience);
router.delete("/experience/:id", deleteExperience);

router.get("/education", getEducation);
router.post("/education", createEducation);
router.delete("/education/:id", deleteEducation);

router.get("/certifications", getCertifications);
router.post("/certifications", createCertification);
router.delete("/certifications/:id", deleteCertification);

// Blog
router.get("/blog", getBlogPosts);
router.post("/blog", createBlogPost);
router.put("/blog/:id", updateBlogPost);
router.delete("/blog/:id", deleteBlogPost);

// Contact Messages / Inbox
router.get("/messages", getMessages);
router.patch("/messages/:id/read", toggleMessageRead);
router.patch("/messages/:id/archive", toggleMessageArchived);
router.delete("/messages/:id", deleteMessage);

// Assistant Q&A
router.get("/assistant-qa", getAssistantQA);
router.post("/assistant-qa", createAssistantQA);
router.put("/assistant-qa/:id", updateAssistantQA);
router.delete("/assistant-qa/:id", deleteAssistantQA);

export default router;
