import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UserModel, IUserDocument } from "../models/User.js";

export interface AuthenticatedUserPayload {
  id: string;
  email: string;
  role: "owner" | "admin" | "demo";
  tokenVersion: number;
}

export interface AuthenticatedRequest extends Request {
  user?: IUserDocument;
}

export const AUTH_COOKIE_NAME = "mehedi_admin_token";

/**
 * Generates a signed JWT session token with user ID, role, and tokenVersion
 */
export function generateToken(user: IUserDocument): string {
  const payload: AuthenticatedUserPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    tokenVersion: user.tokenVersion,
  };

  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

/**
 * Extracts authentication token from either cookies or Authorization header
 */
function extractToken(req: Request): string | null {
  // 1. Check signed/unsigned cookies
  if (req.cookies && req.cookies[AUTH_COOKIE_NAME]) {
    return req.cookies[AUTH_COOKIE_NAME];
  }

  // 2. Check Authorization Bearer header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }

  return null;
}

/**
 * Middleware to authenticate requests via JWT cookie or header
 */
export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(401).json({
        success: false,
        error: "Authentication required: no active session or credentials provided",
      });
      return;
    }

    let decoded: AuthenticatedUserPayload;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET) as AuthenticatedUserPayload;
    } catch (jwtErr) {
      res.status(401).json({
        success: false,
        error: "Session expired or invalid. Please log in again.",
      });
      return;
    }

    // Retrieve active user record
    const user = await UserModel.findById(decoded.id);

    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        error: "Account not found or deactivated.",
      });
      return;
    }

    // Verify token version (invalidates tokens when password or security settings change)
    if (decoded.tokenVersion !== user.tokenVersion) {
      res.status(401).json({
        success: false,
        error: "Security credentials have changed. Please log in again.",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Role-based authorization middleware
 */
export function requireRole(allowedRoles: Array<"owner" | "admin" | "demo">) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Authentication required" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: "Forbidden: insufficient permissions for this operation",
      });
      return;
    }

    next();
  };
}
