const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
require("dotenv").config();
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");

function getUserFromAuthToken(req) {
  const authorizationToken = req.headers.authorization;
  const decoded = jwt.decode(authorizationToken);
  const username = decoded.username;

  return username;
}

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const user = {
    username: username,
    password: password,
  };

  const isUserExists = await User.findOne(user);

  if (isUserExists) {
    res.json({ message: "User already exists" });
  } else {
    await User.create(user);
    res.status(200).json({ message: "User created successfully" });
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = {
    username: username,
    password: password,
  };

  const isUserExists = await User.findOne(user);

  if (isUserExists) {
    const jwtToken = jwt.sign({ username: username }, process.env.JWT_PASSWORD);
    res.status(200).json({ token: jwtToken });
  } else {
    res.json({ message: "Username or password is wrong." });
  }
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({ courses: courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = getUserFromAuthToken(req);

  await User.updateOne(
    { username: username },
    { $push: { purchasedCourse: courseId } }
  );

  res.status(200).json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = getUserFromAuthToken(req);

  const user = await User.findOne({ username: username });
  const purchasedCourses = user.purchasedCourse;

  const courses = await Course.find({
    _id: {
      $in: purchasedCourses,
    },
  });

  res.status(200).json({purchasedCourses: courses});
});

module.exports = router;
