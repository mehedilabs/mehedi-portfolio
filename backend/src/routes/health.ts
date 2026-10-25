import { Router, Request, Response } from "express";
import { isDatabaseConnected } from "../config/db.js";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  const dbConnected = isDatabaseConnected();
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    status: "ok",
    service: "mehedi-portfolio-api",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    database: {
      connected: dbConnected,
      status: dbConnected ? "healthy" : "disconnected (fallback mode)",
    },
    system: {
      memoryRssMb: Math.round(memoryUsage.rss / 1024 / 1024),
      nodeVersion: process.version,
    },
  });
});

export default router;

