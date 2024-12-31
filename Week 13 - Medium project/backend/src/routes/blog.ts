import { Router, Request } from "express";
import userAuth from "../middlewares/userAuth";
import { PrismaClient } from "@prisma/client";
const blogRouter = Router();
import { zodCreateBlogObject } from "@ishan321/common";

const prisma = new PrismaClient();

interface CustomRequest extends Request{
    userId?: number
}

blogRouter.post("/", userAuth, async (req: CustomRequest, res) => {
    const title: string = req.body.title;
    const content: string = req.body.content;
    const authorId: number = req.userId!;

    const zodResponse = zodCreateBlogObject.safeParse({
        title, content, authorId
    });

    if(!zodResponse.success){
        res.status(411).json({
            "error": "Wrong inputs provided"
        });
        return;
    }

    try {
        const blogDbRes = await prisma.post.create({
            data: {
                title, content, authorId
            }
        });

        res.status(200).json({
            postId: blogDbRes.id
        });
    } catch (error) {
        res.status(411).json({
            "error": "Something went wrong while uploading the blogpost"
        });
    }
});

blogRouter.put("/", userAuth, async (req: CustomRequest, res) => {
    const blogId: number = Number(req.body.blogId);
    const title: string = req.body.title;
    const content: string = req.body.content;
    const authorId: number = req.userId!;

    const zodResponse = zodCreateBlogObject.safeParse({
        title, content, authorId
    });

    if(!zodResponse.success || !blogId){
        res.status(411).json({
            "error": "Wrong inputs provided"
        });
        return;
    }

    try {
        const response = await prisma.post.update({
            where: {
                id: blogId,
                authorId: authorId
            },
            data: {
                title,
                content,
            }
        });

        res.status(200).json({
            blogId: response.id,
            "message": "Successfully updated the blogpost"
        });
    } catch (error) {
        res.status(404).json({
            "error": "Something went wrong while updating blogpost"
        });
    }
});

blogRouter.get("/getBlog/:id", async (req, res) => {
    const blogId: number = Number(req.params.id);

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: blogId
            }, select: {
                id: true,
                title: true,
                content: true,
                publised: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if(!blog){
            res.status(404).json({
                error: "No blog found"
            });    
            return;
        }

        res.status(200).json({
            blog
        });
    } catch (error) {
        res.status(411).json({
            error: "Failed fetching the blog"
        });
    }
});

blogRouter.get("/bulk", async (req, res) => {
    try {
        const allBlogs = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                publised: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        res.status(200).json({
            allBlogs
        });
    } catch (error) {
        res.status(411).json({
            error: "Error while fetching blogs"
        });
    }
});

export default blogRouter;