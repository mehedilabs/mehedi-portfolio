import { Request, Response, NextFunction } from "express";
import { UserModel, hashPassword } from "../models/User.js";
import { AuditLogModel } from "../models/AuditLog.js";
import { generateToken, AUTH_COOKIE_NAME, AuthenticatedRequest } from "../middleware/auth.js";
import { env } from "../config/env.js";

/**
 * Helper to set the secure HTTP-only session cookie
 */
function setAuthCookie(res: Response, token: string): void {
  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  });
}

/**
 * POST /api/auth/login
 * Authenticates user credentials and returns session token + cookie
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    const userAgent = req.headers["user-agent"] || "unknown";

    const user = await UserModel.findOne({ email: email.toLowerCase().trim() }).select("+passwordHash");

    if (!user || !user.isActive) {
      await AuditLogModel.create({
        action: "AUTH_LOGIN_FAILED",
        resource: "User",
        userEmail: email,
        ipAddress: clientIp,
        userAgent,
        details: { reason: "User not found or inactive" },
      });

      res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await AuditLogModel.create({
        action: "AUTH_LOGIN_FAILED",
        resource: "User",
        userId: user._id.toString(),
        userEmail: user.email,
        ipAddress: clientIp,
        userAgent,
        details: { reason: "Password mismatch" },
      });

      res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
      return;
    }

    // Update login timestamp
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user);
    setAuthCookie(res, token);

    await AuditLogModel.create({
      action: "AUTH_LOGIN_SUCCESS",
      resource: "User",
      userId: user._id.toString(),
      userEmail: user.email,
      ipAddress: clientIp,
      userAgent,
    });

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/logout
 * Clears session cookie and invalidates client session
 */
export async function logout(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    res.clearCookie(AUTH_COOKIE_NAME, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    if (req.user) {
      await AuditLogModel.create({
        action: "AUTH_LOGOUT",
        resource: "User",
        userId: req.user._id.toString(),
        userEmail: req.user.email,
        ipAddress: req.ip,
      });
    }

    res.status(200).json({
      success: true,
      message: "Signed out successfully",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/auth/me
 * Returns current authenticated user state
 */
export async function getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, error: "Not authenticated" });
    return;
  }

  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      lastLogin: req.user.lastLogin,
      createdAt: req.user.createdAt,
    },
  });
}

/**
 * POST /api/auth/change-password
 * Verifies current password, updates to new password, and invalidates other sessions
 */
export async function changePassword(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Authentication required" });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    if (currentPassword === newPassword) {
      res.status(400).json({
        success: false,
        error: "New password must be different from current password",
      });
      return;
    }

    const user = await UserModel.findById(req.user._id).select("+passwordHash");
    if (!user) {
      res.status(404).json({ success: false, error: "Account not found" });
      return;
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      res.status(400).json({
        success: false,
        error: "Current password verification failed. Please check your credentials.",
      });
      return;
    }

    // Hash new password and increment tokenVersion to revoke all older sessions
    user.passwordHash = await hashPassword(newPassword);
    user.tokenVersion = (user.tokenVersion || 1) + 1;
    await user.save();

    // Issue a fresh token for the current session
    const newToken = generateToken(user);
    setAuthCookie(res, newToken);

    await AuditLogModel.create({
      action: "AUTH_PASSWORD_CHANGED",
      resource: "User",
      userId: user._id.toString(),
      userEmail: user.email,
      ipAddress: req.ip,
      details: { tokenVersion: user.tokenVersion },
    });

    res.status(200).json({
      success: true,
      message: "Password changed successfully. All other active sessions have been invalidated.",
      token: newToken,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/change-email
 * Reauthenticates owner password and updates account email address
 */
export async function changeEmail(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Authentication required" });
      return;
    }

    const { password, newEmail } = req.body;
    const formattedEmail = newEmail.toLowerCase().trim();

    if (formattedEmail === req.user.email) {
      res.status(400).json({
        success: false,
        error: "The specified email is already your current email address",
      });
      return;
    }

    const user = await UserModel.findById(req.user._id).select("+passwordHash");
    if (!user) {
      res.status(404).json({ success: false, error: "Account not found" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({
        success: false,
        error: "Password verification failed. Unable to change email address.",
      });
      return;
    }

    // Check if new email is already in use by another user
    const existingUser = await UserModel.findOne({ email: formattedEmail });
    if (existingUser) {
      res.status(409).json({
        success: false,
        error: "This email address is already in use by another account",
      });
      return;
    }

    const oldEmail = user.email;
    user.email = formattedEmail;
    user.tokenVersion = (user.tokenVersion || 1) + 1; // Invalidate older tokens
    await user.save();

    // Issue updated token
    const newToken = generateToken(user);
    setAuthCookie(res, newToken);

    await AuditLogModel.create({
      action: "AUTH_EMAIL_CHANGED",
      resource: "User",
      userId: user._id.toString(),
      userEmail: user.email,
      ipAddress: req.ip,
      details: { oldEmail, newEmail: formattedEmail },
    });

    res.status(200).json({
      success: true,
      message: "Account email address updated successfully",
      token: newToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/setup-initial-admin
 * Initializes the owner account. ONLY callable if 0 users exist in the database!
 */
export async function setupInitialAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const existingCount = await UserModel.countDocuments();
    if (existingCount > 0) {
      res.status(403).json({
        success: false,
        error: "Admin account is already configured. Initial setup is permanently locked.",
      });
      return;
    }

    const { name, email, password } = req.body;
    const formattedEmail = email.toLowerCase().trim();

    const hashedPassword = await hashPassword(password);
    const newOwner = await UserModel.create({
      name: name.trim(),
      email: formattedEmail,
      passwordHash: hashedPassword,
      role: "owner",
      tokenVersion: 1,
      isActive: true,
      lastLogin: new Date(),
    });

    const token = generateToken(newOwner);
    setAuthCookie(res, token);

    await AuditLogModel.create({
      action: "AUTH_INITIAL_OWNER_CREATED",
      resource: "User",
      userId: newOwner._id.toString(),
      userEmail: newOwner.email,
      ipAddress: req.ip,
    });

    res.status(201).json({
      success: true,
      message: "Owner account initialized successfully",
      token,
      user: {
        id: newOwner._id,
        name: newOwner.name,
        email: newOwner.email,
        role: newOwner.role,
      },
    });
  } catch (error) {
    next(error);
  }
}
