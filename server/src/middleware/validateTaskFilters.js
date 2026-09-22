import AppError from '../utils/AppError.js';

export const validateTaskStatus = (req, res, next) => {
  const { status } = req.query;

  if (!status) {
    return next();
  }

  if (!["active", "completed"].includes(status)) {
    throw new AppError("Status must be either active or completed", 400);
  }

  next();
}