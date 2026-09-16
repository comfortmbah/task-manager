import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { healthCheck } from "../controllers/healthController.js";

const router = express.Router();

router.get("/", asyncHandler(healthCheck));

export default router;