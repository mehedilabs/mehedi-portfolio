import mongoose from "mongoose";
import { env } from "./env.js";

let isConnected = false;

export async function connectDatabase(): Promise<void> {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: env.NODE_ENV !== "production",
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(
      `[Database] Successfully connected to MongoDB Atlas: ${conn.connection.host}`
    );

    mongoose.connection.on("error", (err) => {
      console.error("[Database] Runtime error:", err);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("[Database] MongoDB connection disconnected.");
      isConnected = false;
    });
  } catch (error) {
    console.warn(
      "[Database] Notice: MongoDB connection could not be established immediately. The application will serve fallback static structures until the database is available:",
      error instanceof Error ? error.message : String(error)
    );
    isConnected = false;
  }
}

export function isDatabaseConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}

export function getDatabaseHealth(): {
  status: "connected" | "disconnected";
  readyState: number;
  host?: string;
  name?: string;
} {
  const readyState = mongoose.connection.readyState;
  const isReady = readyState === 1;
  return {
    status: isReady ? "connected" : "disconnected",
    readyState,
    host: isReady ? mongoose.connection.host : undefined,
    name: isReady ? mongoose.connection.name : undefined,
  };
}

export async function closeDatabase(): Promise<void> {
  if (isConnected) {
    await mongoose.connection.close();
    isConnected = false;
    console.log("[Database] MongoDB connection gracefully closed.");
  }
}
