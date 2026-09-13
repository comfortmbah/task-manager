import AppError from "../utils/AppError.js";

export const validateTaskId = (req, res, next) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    throw new AppError("Invalid task ID", 400);
  }

  next();
}