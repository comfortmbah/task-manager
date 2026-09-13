import express from "express";
import { createUserController, loginUserController, getCurrentUserController } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { validateRegistration } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/", validateRegistration, createUserController);

router.post("/login", loginUserController);

router.get("/me", authenticate, getCurrentUserController);

export default router;