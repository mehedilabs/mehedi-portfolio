import { Router, Request, Response } from "express";
import { isDatabaseConnected, getDatabaseHealth } from "../config/db.js";
import { env } from "../config/env.js";

const router = Router();

/**
 * GET /api/health
 * Basic liveness probe
 */
router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "mehedi-portfolio-backend",
    version: "1.0.0",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/ready
 * Readiness probe inspecting database and dependencies (safe: no passwords/keys exposed)
 */
router.get("/ready", (req: Request, res: Response) => {
  const dbHealth = getDatabaseHealth();
  const memoryUsage = process.memoryUsage();

  const isReady = isDatabaseConnected();

  res.status(isReady ? 200 : 503).json({
    status: isReady ? "ready" : "degraded",
    environment: env.NODE_ENV,
    database: {
      status: dbHealth.status,
      readyState: dbHealth.readyState,
      connected: isReady,
      host: dbHealth.host ? "configured" : "unreachable",
    },
    system: {
      uptimeSeconds: Math.floor(process.uptime()),
      rssMb: Math.round((memoryUsage.rss / 1024 / 1024) * 10) / 10,
      heapUsedMb: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 10) / 10,
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
