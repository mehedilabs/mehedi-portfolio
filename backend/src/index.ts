import express, { Request, Response } from "express";
import path from "node:path";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { connectDatabase, closeDatabase, isDatabaseConnected } from "./config/db.js";
import healthRoutes from "./routes/health.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import mediaRoutes from "./routes/media.js";
import portfolioRoutes from "./routes/portfolio.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { UserModel, hashPassword } from "./models/User.js";
import { AuditLogModel } from "./models/AuditLog.js";

const app = express();
const PORT = env.PORT || 5000;

// Security & Parsing Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: env.CORS_ORIGIN.includes(",")
      ? env.CORS_ORIGIN.split(",").map((s) => s.trim())
      : env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Static direct media uploads
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

// General API Rate Limiting for all /api endpoints
app.use("/api", apiLimiter);

// Route Mounting
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api", portfolioRoutes);

// Root informational endpoint
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    service: "Mehedi Portfolio REST API",
    version: "1.0.0",
    health: "/api/health",
    readiness: "/api/ready",
  });
});

// 404 Catch-All
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.url}`,
  });
});

// Centralized Error Handling
app.use(errorHandler);

/**
 * Automatically seeds the initial owner account if configured via env
 * and zero users currently exist in MongoDB.
 */
async function autoSeedInitialOwner(): Promise<void> {
  if (!isDatabaseConnected()) return;
  if (!env.ADMIN_INITIAL_EMAIL || !env.ADMIN_INITIAL_PASSWORD) return;

  try {
    const existingCount = await UserModel.countDocuments();
    if (existingCount === 0) {
      const email = env.ADMIN_INITIAL_EMAIL.toLowerCase().trim();
      const passwordHash = await hashPassword(env.ADMIN_INITIAL_PASSWORD);

      await UserModel.create({
        name: "Mehedi Hasan",
        email,
        passwordHash,
        role: "owner",
        tokenVersion: 1,
        isActive: true,
      });

      await AuditLogModel.create({
        action: "AUTO_SEED_INITIAL_OWNER",
        resource: "User",
        userEmail: email,
        details: { method: "environment_seed" },
      });

      console.log(`[Auth] Initial owner account successfully auto-seeded for: ${email}`);
    }
  } catch (seedErr) {
    console.error("[Auth] Error during initial owner auto-seed:", seedErr);
  }
}

// Bootstrap Server
async function startServer() {
  await connectDatabase();
  await autoSeedInitialOwner();

  const server = app.listen(PORT, () => {
    console.log(
      `[Server] Express API operational on port ${PORT} (env: ${env.NODE_ENV})`
    );
  });

  // Graceful Shutdown Handling
  const shutdown = async (signal: string) => {
    console.log(`\n[Server] Received ${signal}. Initiating graceful shutdown...`);
    server.close(async () => {
      await closeDatabase();
      console.log("[Server] HTTP server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer().catch((err) => {
  console.error("[Server] Fatal error during startup:", err);
  process.exit(1);
});

export default app;
