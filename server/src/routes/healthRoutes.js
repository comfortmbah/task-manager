import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { healthCheck, livenessCheck } from "../controllers/healthController.js";

const router = express.Router();

router.get("/", asyncHandler(healthCheck));

router.get("/live", livenessCheck);

export default router;