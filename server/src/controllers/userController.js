import { createUser } from "../models/userModel.js";

export const createUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await createUser(name, email, password);

  res.status(201).json(user);
}

