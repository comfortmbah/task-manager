import express from "express";
import { getTasks, createTaskController, updateTaskController, deleteTaskController, deleteCompletedTasksController } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);

router.post("/", createTaskController);

router.patch("/:id", updateTaskController);

router.delete("/completed", deleteCompletedTasksController);

router.delete("/:id", deleteTaskController);

export default router;