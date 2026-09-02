import express from "express";
import { getTodosList, createTodo, updateTodo, deleteTodo, deleteCompletedTodo } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodosList);

router.post("/", createTodo);

router.patch("/:id", updateTodo);

router.delete("/completed", deleteCompletedTodo)

router.delete("/:id", deleteTodo);

export default router;