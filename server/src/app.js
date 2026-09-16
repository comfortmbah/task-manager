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

app.use("/health", healthRoutes);

app.use("/api", apiLimiter);

app.use("/api/tasks", taskRouter);

app.use("/api/users", userRouter);

app.use(notFound);

app.use(errorHandler);

const shutdown = async () => {
  console.log("shutting down server...");

  await pool.end();

  console.log("Database connections closed.");

  process.exit(0);
}

process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:", error);

  process.exit(1);
})

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default app;