import AppError from "../utils/AppError.js";


export const errorHandler = (err, req, res, next) => {
  console.error({
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    name: err.name,
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    code: err.code,
    detail: err.detail,
    constraint: err.constraint,
    isOperational: err.isOperational,
  });

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON format"
    });
  }

  if (err.code === "23505") {
    return res.status(409).json({
      message: "A user with this email already exist",
    });
  }

  if (err.code === "23503") {
    return res.status(400).json({
      message: "Invalid related resource",
    });
  }

  const statusCode = Number.isInteger(err.statusCode) && err.statusCode >= 400 ? err.statusCode : 500;

  const message = process.env.NODE_ENV === "production" ? "Internal server error" : err.message || "Internal server error";

  return res.status(statusCode).json(message);
}

export const notFound = (req, res, next) => {
  next(
    new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404)
  );
}