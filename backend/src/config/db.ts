import mongoose from "mongoose";

let isConnected = false;

export async function connectDatabase(): Promise<void> {
  if (isConnected) {
    return;
  }

  const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/mehedi_portfolio";

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: process.env.NODE_ENV !== "production",
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

export async function closeDatabase(): Promise<void> {
  if (isConnected) {
    await mongoose.connection.close();
    isConnected = false;
    console.log("[Database] MongoDB connection gracefully closed.");
  }
}
