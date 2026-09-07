import express from "express";
import { createUserController } from "../controllers/userController";

const router = express.Router();

router.post("/", createUserController);

export default router;