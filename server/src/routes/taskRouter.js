import express from "express";
import { getTasks, createTaskController, updateTaskController } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);

router.post("/", createTaskController);

router.patch("/:id", updateTaskController);

//router.delete("/completed", deleteCompletedTodo)

//router.delete("/:id", deleteTodo);

export default router;