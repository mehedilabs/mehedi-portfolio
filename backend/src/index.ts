import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase, closeDatabase } from "./config/db.js";
import healthRoutes from "./routes/health.js";
import portfolioRoutes from "./routes/portfolio.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// Security & Parsing Middleware
app.use(
  cors({
    origin: CORS_ORIGIN.includes(",")
      ? CORS_ORIGIN.split(",").map((s) => s.trim())
      : CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// Route Mounting
app.use("/api", healthRoutes);
app.use("/api", portfolioRoutes);

// Root informational endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    service: "Mehedi Portfolio REST API",
    version: "1.0.0",
    docs: "/api/health",
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

// Bootstrap Server
async function startServer() {
  await connectDatabase();

  const server = app.listen(PORT, () => {
    console.log(
      `[Server] Express API operational on port ${PORT} (env: ${process.env.NODE_ENV || "development"})`
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
