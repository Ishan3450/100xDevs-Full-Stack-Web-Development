const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  const response = await User.findOne({
    username: username,
    password: password,
  });

  if (response) {
    next();
  } else {
    res.status(403).json({
      msg: "User doesnt exist",
    });
  }
}

module.exports = userMiddleware;
