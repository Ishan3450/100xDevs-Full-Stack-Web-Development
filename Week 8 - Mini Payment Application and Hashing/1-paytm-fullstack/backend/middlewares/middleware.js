require("dotenv").config();
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authorizationToken = req.headers.authorization;

  if (!authorizationToken || !authorizationToken.startsWith("Bearer")) {
    res.status(403).json({
      message: "Token not verified",
    });
    return;
  }

  const jwtToken = authorizationToken.split(" ")[1];

  try {
    const verifiedData = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.userId = verifiedData.userId;
    next();
  } catch (err) {
    res.status(403).json({
      message: "Token not verified",
    });
  }
}

module.exports = {
    authMiddleware
}