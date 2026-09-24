import express from "express";
import "../config/env.js";
import cors from "cors";
import taskRouter from "./routes/taskRouter.js" 
import userRouter from "./routes/userRouter.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import pool from "../config/db.js";
import helmet from "helmet";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { requestId } from "./middleware/requestId.js";
import healthRoutes from "./routes/healthRoutes.js";

const app = express();

app.use(requestId);

app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL,
}));

app.use(express.json({ limit: "10kb" }));

app.use("/api/health", healthRoutes);

app.use("/api", apiLimiter);

app.use("/api/tasks", taskRouter);

app.use("/api/users", userRouter);

app.use(notFound);

app.use(errorHandler);

const shutdown = async (signal) => {
  console.log(`${signal} received. shutting down server...`);

  const shutdownTimeout = setTimeout(() => {
    console.error("Shutdown timed out. Forcing exit.");
    process.exit(1);
  }, 10000);

  try {
    await pool.end();

    clearTimeout(shutdownTimeout);

    console.log("Database connections closed.");
    process.exit(0);
  } catch (error) {
    clearTimeout(shutdownTimeout);
    
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
}

process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:", error);

  process.exit(1);
})

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);

  process.exit(1);
})

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

export default app;