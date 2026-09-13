export const errorHandler = (err, req, res, next) => {
  console.error({
    message: err.message,
    stack: err.stack,
    code: err.code,
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

  res.status(500).json({
    message: "Internal server error"
  });
}

export const notFound = (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}