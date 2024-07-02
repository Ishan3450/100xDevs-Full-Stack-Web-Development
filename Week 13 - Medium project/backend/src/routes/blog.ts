import { Router } from "express";
import userAuth from "../middlewares/userAuth";
const blogRouter = Router();

blogRouter.use(userAuth); // middleware

blogRouter.post("/", (req, res) => {
    res.json({});
});

blogRouter.put("/", (req, res) => {

});

blogRouter.get("/:id", (req, res) => {

});

blogRouter.get("/bulk", (req, res) => {

});

export default blogRouter;