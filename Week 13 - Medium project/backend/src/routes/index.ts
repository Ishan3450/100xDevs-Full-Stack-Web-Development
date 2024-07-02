import { Router } from "express";
import userRouter from "./user";
import blogRouter from "./blog";
const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/blog", blogRouter);

export default rootRouter;