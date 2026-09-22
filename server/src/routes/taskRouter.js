import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateTaskId, validateTaskUpdate, validateTaskCreation } from "../middleware/validateTask.js";
import { validatePagination } from "../middleware/validatePagination.js";
import { validateTaskStatus, validateTaskSearch } from "../middleware/validateTaskFilters.js";
import { getTasks, createTaskController, updateTaskController, deleteTaskController, deleteCompletedTasksController } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", authenticate, validatePagination, validateTaskStatus, validateTaskSearch, asyncHandler(getTasks));

router.post("/", authenticate, validateTaskCreation, asyncHandler(createTaskController));

router.patch("/:id", authenticate, validateTaskId, validateTaskUpdate, asyncHandler(updateTaskController));

router.delete("/completed", authenticate, asyncHandler(deleteCompletedTasksController));

router.delete("/:id", authenticate, validateTaskId, asyncHandler(deleteTaskController));

export default router;