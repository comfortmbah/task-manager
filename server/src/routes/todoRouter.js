import express from "express";
import { getTodosList, createTodo } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodosList);

router.post("/", createTodo);

export default router;