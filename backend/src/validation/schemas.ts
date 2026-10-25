import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters long")
    .regex(/[0-9]|[^a-zA-Z0-9]/, "New password must contain at least one number or special character"),
});

export const changeEmailSchema = z.object({
  password: z.string().min(1, "Current password verification is required"),
  newEmail: z.string().trim().email("Please enter a valid new email address"),
});

export const initialSetupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[0-9]|[^a-zA-Z0-9]/, "Password must contain at least one number or symbol"),
});

export const messageSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email address"),
  subject: z.string().trim().min(2, "Subject must be at least 2 characters").max(200),
  inquiryType: z.enum(["job", "freelance", "consulting", "other"]).default("job"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
});

/**
 * Middleware factory to validate request body against a Zod schema
 */
export function validateBody<T extends z.ZodTypeAny>(schema: T) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issues = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        res.status(400).json({
          success: false,
          error: "Validation error: invalid request payload",
          issues,
        });
        return;
      }
      next(error);
    }
  };
}
