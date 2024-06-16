const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "DB_CONNECTION_URL"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  // * below part is important to understand
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

const Admin = mongoose.model("admins", AdminSchema);
const User = mongoose.model("users", UserSchema);
const Course = mongoose.model("courses", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
