import { Router } from "express";
import {
  login,
  logout,
  getMe,
  changePassword,
  changeEmail,
  setupInitialAdmin,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { authLimiter, sensitiveActionLimiter } from "../middleware/rateLimiter.js";
import {
  validateBody,
  loginSchema,
  changePasswordSchema,
  changeEmailSchema,
  initialSetupSchema,
} from "../validation/schemas.js";

const router = Router();

// Public authentication endpoints with strict rate limiting
router.post("/login", authLimiter, validateBody(loginSchema), login);
router.post("/setup-initial-admin", authLimiter, validateBody(initialSetupSchema), setupInitialAdmin);

// Protected session endpoints
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);

// Sensitive account operations with rate limiting
router.post(
  "/change-password",
  authenticate,
  sensitiveActionLimiter,
  validateBody(changePasswordSchema),
  changePassword
);

router.post(
  "/change-email",
  authenticate,
  sensitiveActionLimiter,
  validateBody(changeEmailSchema),
  changeEmail
);

export default router;
