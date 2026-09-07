import express from "express";
import cors from "cors";
import taskRouter from "./routes/taskRouter.js"

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/tasks", taskRouter);

export default app;