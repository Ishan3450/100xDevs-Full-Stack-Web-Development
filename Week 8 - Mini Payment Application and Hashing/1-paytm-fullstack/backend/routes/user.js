const { Router } = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db/db");
const { authMiddleware } = require("../middlewares/middleware");

const userRouter = Router();
const saltRounds = process.env.HASHING_SALT_ROUNDS;

async function getHashOfPassword(originalPassword) {
  const salt = await bcrypt.genSalt(parseInt(saltRounds));
  return await bcrypt.hash(originalPassword, salt);
}

userRouter.post("/signup", async function (req, res) {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  const zodInputValidation = zod.object({
    email: zod
      .string()
      .email()
      .min(6, "Email length must be atleast of length 6")
      .max(50, "Email length must not exceed 50"),
    firstName: zod.string().max(50, "First name must not exceed 50 characters"),
    lastName: zod.string().max(50, "First name must not exceed 50 characters"),
    password: zod.string().min(6, "Password must be atlest of length 6"),
  });

  const zodValidationResponse = zodInputValidation.safeParse({
    email,
    firstName,
    lastName,
    password,
  });

  if (!zodValidationResponse.success) {
    res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
    return;
  }

  const isUserExists = await User.findOne({ email: email });

  if (isUserExists) {
    res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
    return;
  }

  // creating hash of the original password
  const hashOfPassword = await getHashOfPassword(password);

  const newUser = await User.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: hashOfPassword,
  });
  const userId = newUser._id;

  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET);

  // creating account with some initial amount for the new user
  await Account.create({
    userId,
    balance: 10000,
  });

  res.status(200).json({
    message: "User created successfully",
    token: `Bearer ${jwtToken}`,
  });
});

userRouter.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const zodSchema = zod.object({
    email: zod
      .string()
      .email()
      .min(6, "Email length must be atleast of length 6")
      .max(50, "Email length must not exceed 50"),
    password: zod.string().min(6, "Password must be atlest of length 6"),
  });

  const validationResponse = zodSchema.safeParse({
    email,
    password,
  });

  if (!validationResponse.success) {
    res.status(411).json({
      message: "Wrong inputs",
    });
  }
  const isUserFound = await User.findOne({
    email: email,
  });

  if (!isUserFound) {
    res.status(411).json({
      message: "User not found",
    });
    return;
  }
  const hashedPasswordFromDB = isUserFound.password;

  const isPasswordCorrect = await bcrypt.compare(
    password,
    hashedPasswordFromDB
  );

  if (!isPasswordCorrect) {
    res.status(411).json({
      message: "Incorrect password",
    });
    return;
  }

  const userId = isUserFound._id;
  const jwtToken = jwt.sign(
    {
      userId: userId,
    },
    process.env.JWT_SECRET
  );

  res.status(200).json({
    token: `Bearer ${jwtToken}`,
    username: isUserFound.firstName,
  });
});

userRouter.put("/", authMiddleware, async function (req, res) {
  const zodInputValidation = zod.object({
    firstName: zod.string().max(50, "First name must not exceed 50 characters"),
    lastName: zod.string().max(50, "First name must not exceed 50 characters"),
    password: zod.string().min(6, "Password must be atlest of length 6"),
  });

  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const validationResponse = zodInputValidation.safeParse({
    password,
    firstName,
    lastName,
  });

  if (!validationResponse.success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  const userId = req.userId;

  await User.updateOne(
    {
      _id: userId,
    },
    {
      password: await getHashOfPassword(password),
      firstName: firstName,
      lastName: lastName,
    }
  );

  res.status(200).json({
    message: "Updated successfully",
  });
});

userRouter.get("/bulk", authMiddleware, async function (req, res) {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });

  res.status(200).json({
    users: users
      .filter((user) => user._id.toString() !== req.userId)
      .map((user) => ({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })),
  });
});

module.exports = userRouter;
