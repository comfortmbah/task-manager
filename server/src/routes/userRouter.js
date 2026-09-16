import express from "express";
import { createUserController, loginUserController, getCurrentUserController } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { validateRegistration, validateLogin } from "../middleware/validateUser.js";
import asyncHandler from "../utils/asyncHandler.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", validateRegistration, asyncHandler(createUserController));

router.post("/login", loginLimiter, validateLogin, asyncHandler(loginUserController));

router.get("/me", authenticate, asyncHandler(getCurrentUserController));

export default router;