import express from "express";
import { getTodosList } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodosList);

export default router;