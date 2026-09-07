import express from "express";
import { getTasks } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);

//router.post("/", createTodo);

//router.patch("/:id", updateTodo);

//router.delete("/completed", deleteCompletedTodo)

//router.delete("/:id", deleteTodo);

export default router;