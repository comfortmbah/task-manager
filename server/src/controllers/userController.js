import { createUser } from "../models/userModel.js";

export const createUserController = async (req, res) => {
  const { name, email } = req.body;

  const user = await createUser(name, email);

  res.status(201).json(user);
}

