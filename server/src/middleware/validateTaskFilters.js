import AppError from '../utils/AppError.js';

export const validateTaskStatus = (req, res, next) => {
  const { status } = req.query;

  if (!status) {
    return next();
  }

  const normalizedStatus = status.trim().toLowerCase();

  if (!["active", "completed"].includes(normalizedStatus)) {
    throw new AppError("Status must be either active or completed", 400);
  }

  next();
}