import AppError from '../utils/AppError.js';

export const validateTaskSort = (req, res, next) => {
  const { sort = "created_at", order = "asc" } = req.query;
 
  const allowedSortFields = ["created_at", "updated_at", "text"];

  if (!allowedSortFields.includes(sort)) {
    throw new AppError("Sort must be created_at, updated_at, or text", 400);
  }

  const normalizedOrder = order.toLowerCase();

  if (!["asc", "desc"].includes(normalizedOrder)) {
    throw new AppError("Order must be either asc or desc", 400);
  }

  req.taskSort = sort;
  req.taskOrder = normalizedOrder;

  next();
}