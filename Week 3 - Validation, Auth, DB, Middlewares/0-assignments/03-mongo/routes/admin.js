const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const response = await Admin.findOne({ username: username });

  if (response) {
    res.json({
      error: "Admin already exists !!",
    });
  } else {
    await Admin.create({ username: username, password: password });
    res.status(200).send("Admin created successfully");
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const isCourseExists = await Course.findOne({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  });

  if (isCourseExists) {
    res.json({ message: "Same course already exists !!" });
  } else {
    const newCourse = await Course.create({
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
    });

    res.json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const allCourses = await Course.find({});
  res.json({ courses: allCourses });
});

module.exports = router;
