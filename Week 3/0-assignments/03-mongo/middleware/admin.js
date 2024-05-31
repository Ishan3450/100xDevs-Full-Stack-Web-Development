const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  const response = await Admin.findOne({
    username: username,
    password: password,
  });

  if (response) {
    next();
  } else {
    res.status(403).json({
      msg: "Admin doesnt exist",
    });
  }
}

module.exports = adminMiddleware;
