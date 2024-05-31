require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  const authorizationToken = req.headers.authorization;

  try {
    jwt.verify(authorizationToken, process.env.JWT_PASSWORD);
    next();
  } catch (err) {
    res.json({
      error: "Token not verified !!",
    });
  }
}

module.exports = adminMiddleware;
