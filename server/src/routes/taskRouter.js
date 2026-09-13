import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getTasks, createTaskController, updateTaskController, deleteTaskController, deleteCompletedTasksController } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", authenticate, asyncHandler(getTasks));

router.post("/", authenticate, asyncHandler(createTaskController));

router.patch("/:id", authenticate, asyncHandler(updateTaskController));

router.delete("/completed", authenticate, asyncHandler(deleteCompletedTasksController));

router.delete("/:id", authenticate, asyncHandler(deleteTaskController));

export default router;