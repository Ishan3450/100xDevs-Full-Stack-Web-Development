const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const response = await User.findOne({ username: username });

  if (response) {
    res.json({
      error: "User already exists !!",
    });
  } else {
    await User.create({
      username: username,
      password: password,
      purchasedCourses: [],
    });
    // await User.create({ username: username, password: password }); // both are same specifying purchasedCourse: [] or not defining
    res.status(200).send("User created successfully");
  }
});

router.get("/courses", async (req, res) => {
  const allCourses = await Course.find({});
  res.json({ courses: allCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );

  res.status(200).json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.headers.username;
  const user = await User.findOne({ username: username });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.status(200).json({ purchasedCourses: courses });
});

module.exports = router;
