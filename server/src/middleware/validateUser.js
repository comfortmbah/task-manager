import AppError from "../utils/AppError.js"


export const validateRegistration = (req, res, next) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    throw new AppError("Request body must be a valid object", 400);
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required", 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new AppError("Please provide a valid email address", 400);
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail.length > 255) {
    throw new AppError("Email must not exceed 255 characters", 400);
  }

  const normalizedName = name.trim();

  if (!normalizedName) {
    throw new AppError("Name is required", 400);
  }

  if (normalizedName.length > 100) {
    throw new AppError("Name must not exceed 100 characters", 400);
  }

  if (password.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }

  if (password.length > 72) {
    throw new AppError("Password must not exceed 72 characters", 400);
  }

  if (!password.trim()) {
    throw new AppError("Password cannot contain only spaces", 400);
  }

  req.body.name = normalizedName;
  req.body.email = normalizedEmail;

  next();
}

export const validateLogin = (req, res, next) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    throw new AppError("Request body must be a valid object", 400);
  }
  
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const normalizedEmail = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new AppError("Please provide a valid email address", 400);
  }

  req.body.email = normalizedEmail;

  next();
}