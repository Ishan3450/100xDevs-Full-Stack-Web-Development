const { Router } = require("express");
const accountRouter = Router();
const { authMiddleware } = require("../middlewares/middleware");
const { Account } = require("../db/db");
const mongoose = require("mongoose");

accountRouter.use(authMiddleware);

accountRouter.get("/balance", async function (req, res) {
  const userId = req.userId;

  const account = await Account.findOne({
    userId,
  });

  res.status(200).json({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", async function (req, res) {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const senderAccount = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      res.status(400).json({
        message: "Invalid account / Insufficient balance",
      });
      return;
    }

    const receiverAccount = await Account.findOne({ userId: to }).session(
      session
    );

    if (!receiverAccount) {
      await session.abortTransaction();
      res.status(400).json({
        message: "Invalid receiver's account",
      });
      return;
    }

    // transferring of funds from one account to another account
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // commiting all the changes made till this point
    await session.commitTransaction();
    res.status(200).json({
      message: "Transfer successful",
    });
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong !!",
    });
  }
});

module.exports = accountRouter;
