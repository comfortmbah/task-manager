import AppError from "../utils/AppError.js";

export const validateTaskId = (req, res, next) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    throw new AppError("Invalid task ID", 400);
  }

  next();
}

export const validateTaskUpdate = (req, res, next) => {

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    throw new AppError("Request body must be a valid object", 400);
  }
  
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    throw new AppError("Completed must be a boolean", 400);
  }

  next();
}

export const validateTaskCreation = (req, res, next) => {

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    throw new AppError("Request body must be a valid object", 400);
  }

  const { text } = req.body;

  if (typeof text !== "string") {
    throw new AppError("Task text must be a string", 400);
  }

  const normalizedText = text.trim();

  if (!normalizedText) {
    throw new AppError("Task text is required", 400);
  }

  if (normalizedText.length > 255) {
    throw new AppError("Task text must not exceed 255 characters", 400);
  }

  req.body.text = normalizedText;

  next();
}