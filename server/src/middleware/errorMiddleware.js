export const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error"
  });
}

export const notFound = (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}