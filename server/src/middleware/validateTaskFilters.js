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

export const validateTaskSearch = (req, res, next) => {
  const { search } = req.query;

  if (search === undefined) {
    return next();
  }

  if (typeof search !== "string") {
    throw new AppError("Search must be a string", 400);
  }

  const normalizedSearch = search.trim();

  if (normalizedSearch.length > 100) {
    throw new AppError("Search must not exceed 100 characters", 400);
  }

  req.taskSearch = normalizedSearch;

  next();
}