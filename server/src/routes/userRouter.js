import express from "express";
import { createUserController, loginUserController } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUserController);

router.post("/login", loginUserController);

router.get("/me", authenticate, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user
  });
});

export default router;