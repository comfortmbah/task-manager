import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById } from "../models/userModel.js";

export const createUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await createUser(name, email, password);

  res.status(201).json(user);
}

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
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
