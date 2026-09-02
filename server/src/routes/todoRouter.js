import express from "express";
import { getTodosList, createTodo, updateTodo } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodosList);

router.post("/", createTodo);

router.patch("/:id", updateTodo);

export default router;