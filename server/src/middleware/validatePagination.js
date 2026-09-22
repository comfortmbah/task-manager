import AppError from '../utils/AppError.js';

export const validatePagination = (req, res, next) => {
  const { page = "1", limit = '20'} = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    throw new AppError("Page must be a positive integer", 400);
  }

  if (!Number.isInteger(limitNumber) || limitNumber < 1 || limitNumber > 100) {
    throw new AppError("Limit must be an integer between 1 and 100");
  }

  req.pagination = {
    page: pageNumber,
    limit: limitNumber,
    offset: (pageNumber - 1) * limitNumber,
  };

  next();
}