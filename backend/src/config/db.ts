
import mongoose from "mongoose";
import { env } from "./env.js";

let isConnected = false;

function getConnectionErrorDetails(error: unknown) {
  if (!(error instanceof Error)) {
    return {
      name: "UnknownError",
      message: String(error),
    };
  }

  const mongoError = error as Error & {
    cause?: unknown;
    reason?: {
      servers?: Map<string, { error?: unknown }>;
    };
  };

  const serverErrors = mongoError.reason?.servers
    ? Array.from(mongoError.reason.servers.entries()).map(
        ([address, server]) => ({
          address,
          errorName:
            server.error instanceof Error
              ? server.error.name
              : "UnknownError",
          errorMessage:
            server.error instanceof Error
              ? server.error.message
              : String(server.error ?? "No detailed server error"),
        })
      )
    : [];

  const cause = mongoError.cause;

  return {
    name: mongoError.name,
    message: mongoError.message,
    cause:
      cause instanceof Error
        ? {
            name: cause.name,
            message: cause.message,
          }
        : undefined,
    serverErrors,
  };
}

export async function connectDatabase(): Promise<void> {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
  const conn = await mongoose.connect(env.MONGODB_URI);

    isConnected = conn.connection.readyState === 1;

    console.log(
      `[Database] Successfully connected to MongoDB Atlas: ${conn.connection.host}`
    );

    mongoose.connection.on("error", (error) => {
      console.error(
        "[Database] Runtime connection error:",
        getConnectionErrorDetails(error)
      );
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("[Database] MongoDB connection disconnected.");
      isConnected = false;
    });
  } catch (error) {
    isConnected = false;

    console.error(
      "[Database] MongoDB connection failed. Diagnostic details:",
      getConnectionErrorDetails(error)
    );
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
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    isConnected = false;
    console.log("[Database] MongoDB connection gracefully closed.");
  }
}
