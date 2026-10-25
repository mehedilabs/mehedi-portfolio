import dotenv from "dotenv";

// Load environment variables from .env if present
dotenv.config();

export interface EnvConfig {
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  MONGODB_URI: string;
  CORS_ORIGIN: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  ADMIN_INITIAL_EMAIL?: string;
  ADMIN_INITIAL_PASSWORD?: string;
  CLOUDINARY_CLOUD_NAME?: string;
  CLOUDINARY_API_KEY?: string;
  CLOUDINARY_API_SECRET?: string;
}

/**
 * Validates critical environment variables at startup.
 * Logs only the NAMES of missing or invalid variables, NEVER their values.
 */
export function validateAndLoadEnv(): EnvConfig {
  const missingVars: string[] = [];

  const nodeEnv = (process.env.NODE_ENV || "development") as "development" | "production" | "test";
  const port = parseInt(process.env.PORT || "5000", 10);
  const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
  const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/mehedi_portfolio";
  const jwtSecret = process.env.JWT_SECRET || (nodeEnv === "production" ? "" : "dev_fallback_jwt_secret_do_not_use_in_prod_32chars");
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";

  if (nodeEnv === "production") {
    if (!process.env.MONGODB_URI) {
      missingVars.push("MONGODB_URI");
    }
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      missingVars.push("JWT_SECRET (must be >= 32 characters in production)");
    }
  }

  if (missingVars.length > 0) {
    console.error(
      `[Config] CRITICAL CONFIGURATION ERROR: The following required environment variables are missing or invalid:\n  - ${missingVars.join("\n  - ")}\n`
    );
    if (nodeEnv === "production") {
      process.exit(1);
    }
  }

  return {
    PORT: isNaN(port) ? 5000 : port,
    NODE_ENV: nodeEnv,
    MONGODB_URI: mongoUri,
    CORS_ORIGIN: corsOrigin,
    JWT_SECRET: jwtSecret,
    JWT_EXPIRES_IN: jwtExpiresIn,
    ADMIN_INITIAL_EMAIL: process.env.ADMIN_INITIAL_EMAIL,
    ADMIN_INITIAL_PASSWORD: process.env.ADMIN_INITIAL_PASSWORD,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  };
}

export const env = validateAndLoadEnv();
