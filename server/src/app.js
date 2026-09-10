import express from "express";
import "dotenv/config";
import cors from "cors";
import taskRouter from "./routes/taskRouter.js" 
import userRouter from "./routes/userRouter.js"

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/tasks", taskRouter);

app.use("/api/users", userRouter);

export default app;