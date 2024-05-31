const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Admin Routes
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const isAdminExists = await Admin.findOne({
    username: username,
    password: password,
  });

  if (isAdminExists) {
    res.json({ message: "Admin already exists !!" });
  } else {
    await Admin.create({
      username: username,
      password: password,
    });

    res.json({ message: "Admin created successfully" });
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const isAdminExists = await Admin.findOne({
    username: username,
    password: password,
  });

  if (isAdminExists) {
    const jwtToken = jwt.sign({ username: username }, process.env.JWT_PASSWORD);
    res.status(200).json({ token: jwtToken });
  } else {
    res.status(404).json({ message: "Admin not found !!" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const course = {
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  };

  const isCourseExists = await Course.findOne(course);

  if (isCourseExists) {
    res.json({
      message: "Course already exists.",
    });
  } else {
    const createdCourse = await Course.create(course);
    res.status(200).json({
      message: "Course created successfully",
      courseId: createdCourse._id,
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses: courses });
});

module.exports = router;
