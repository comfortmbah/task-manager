import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { healthCheck, livenessCheck, readinessCheck } from "../controllers/healthController.js";

const router = express.Router();

router.get("/", asyncHandler(healthCheck));

router.get("/live", livenessCheck);

router.get("/ready", asyncHandler(readinessCheck));

export default router;