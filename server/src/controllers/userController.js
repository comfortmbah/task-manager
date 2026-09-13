import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById } from "../models/userModel.js";
import AppError from "../utils/AppError.js";

export const createUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await createUser(name, email, password);

  if (!user) {
    throw new AppError("Unable to create user", 500);
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(201).json({
    user,
    token
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {userId: user.id}, process.env.JWT_SECRET, { expiresIn: "1h" }
  );

  res.json({ token });
};

export const getCurrentUserController = async (req, res) => {
  const userId = req.user.userId;

  const user = await findUserById(userId);

  res.json({ user });
}
