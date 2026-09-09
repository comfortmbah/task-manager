import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getTasks, createTaskController, updateTaskController, deleteTaskController, deleteCompletedTasksController } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", authenticate, getTasks);

router.post("/", authenticate, createTaskController);

router.patch("/:id", authenticate,  updateTaskController);

router.delete("/completed", authenticate, deleteCompletedTasksController);

router.delete("/:id", authenticate, deleteTaskController);

export default router;