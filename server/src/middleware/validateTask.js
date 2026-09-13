import AppError from "../utils/AppError.js";

export const validateTaskId = (req, res, next) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    throw new AppError("Invalid task ID", 400);
  }

  next();
}

export const validateTaskUpdate = (req, res, next) => {
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    throw new AppError("Completed must be a boolean", 400);
  }

  next();
}