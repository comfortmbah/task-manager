import express from "express";
import todoRouter from "./routes/todoRouter.js"

const app = express();

app.use(express.json());

app.use("/api/todos", todoRouter);

export default app;