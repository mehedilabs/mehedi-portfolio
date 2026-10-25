import { Router } from "express";
import {
  getOverview,
  getAuditLogs,
  getSettings,
  updateSettings,
  getProfile,
  updateProfile,
} from "../controllers/adminController.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();

// Protect all admin endpoints with authentication
router.use(authenticate);

// Admin overview & statistics
router.get("/overview", getOverview);
router.get("/audit-logs", getAuditLogs);

// Settings
router.get("/settings", getSettings);
router.put("/settings", requireRole(["owner", "admin"]), updateSettings);

// Profile
router.get("/profile", getProfile);
router.put("/profile", requireRole(["owner", "admin"]), updateProfile);

export default router;
