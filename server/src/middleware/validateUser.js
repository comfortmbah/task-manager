export const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required"
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please provide a valid email address"
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail.length > 255) {
    return res.status(400).json({
      message: "Email must not exceed 255 characters"
    });
  }

  const normalizedName = name.trim();

  if (!normalizedName) {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  if (normalizedName.length > 100) {
    return res.status(400).json({
      message: "Name must not exceed 100 characters"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });
  }

  if (password.length > 72) {
    return res.status(400).json({
      message: "Password must not exceed 72 characters"
    });
  }

  if (!password.trim()) {
    return res.status(400).json({
      message: "Password cannot contain only spaces"
    });
  }

  req.body.name = normalizedName;
  req.body.email = normalizedEmail;

  next();
}