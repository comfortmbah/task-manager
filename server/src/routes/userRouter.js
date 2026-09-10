import express from "express";
import { createUserController, loginUserController, getCurrentUserController } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUserController);

router.post("/login", loginUserController);

router.get("/me", authenticate, getCurrentUserController);

export default router;