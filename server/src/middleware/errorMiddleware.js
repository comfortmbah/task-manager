export const errorHandler = (err, req, res, next) => {
  console.error(err);

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