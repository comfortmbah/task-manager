import express from "express";
import { createUserController, loginUserController, getCurrentUserController } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { validateRegistration, validateLogin } from "../middleware/validateUser.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/", validateRegistration, asyncHandler(createUserController));

router.post("/login", validateLogin, asyncHandler(loginUserController));

router.get("/me", authenticate, getCurrentUserController);

export default router;