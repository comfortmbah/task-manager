import AppError from '../utils/AppError.js';

export const validateTaskSort = (req, res, next) => {
  const { sort = "created_at", order = "asc" } = req.query;
 
  const allowedSortFields = ["created_at", "updated_at", "text"];

  const normalizedSort = sort.toLowerCase();

  if (!allowedSortFields.includes(normalizedSort)) {
    throw new AppError("Sort must be created_at, updated_at, or text", 400);
  }

  const normalizedOrder = order.toLowerCase();

  if (!["asc", "desc"].includes(normalizedOrder)) {
    throw new AppError("Order must be either asc or desc", 400);
  }

  req.taskSort = normalizedSort;
  req.taskOrder = normalizedOrder;

  next();
}