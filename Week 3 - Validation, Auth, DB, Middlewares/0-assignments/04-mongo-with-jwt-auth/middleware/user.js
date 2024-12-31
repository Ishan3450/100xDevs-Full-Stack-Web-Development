const jwt = require("jsonwebtoken");
require("dotenv").config();

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  const authorizationToken = req.headers.authorization;

  try {
    jwt.verify(authorizationToken, process.env.JWT_PASSWORD);
    next();
  } catch (err) {
    res.status(404).json({ error: "invalid authorization token" });
  }
}

module.exports = userMiddleware;
