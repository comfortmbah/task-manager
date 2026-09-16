import express from "express";
import "dotenv/config";
import cors from "cors";
import taskRouter from "./routes/taskRouter.js" 
import userRouter from "./routes/userRouter.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import pool from "../config/db.js";

const app = express();

app.use(cors());

app.use(express.json({ limit: "10kb" }));

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

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default app;