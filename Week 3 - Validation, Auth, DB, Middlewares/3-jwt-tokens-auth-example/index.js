/* 
  At high level there are 3 main functions of jwt:
  sign(json data, password)
  verify(json data, password)
  decode(jwt token)
*/

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

const ALL_USERS = [
  {
    username: "ishan@gmail.com",
    password: "admin",
    name: "ishan j",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  return ALL_USERS.find(function (user) {
    return user.username == username && user.password == password;
  });
}

app.use(express.json());

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword); // **
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword); // **
    const username = decoded.username;
    res.status(200).json(ALL_USERS);
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);
