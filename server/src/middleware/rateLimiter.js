import rateLimit from 'express-rate-limit';

const isTest = process.env.NODE_ENV === "test";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: isTest ? 1000 : 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many login attempts, Please try again later.",
  },
});

export const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: isTest ? 1000 : 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many registration attempts, Please try again later.",
  },
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: isTest ? 1000 : 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many requests, Please try again later.",
  },
});

