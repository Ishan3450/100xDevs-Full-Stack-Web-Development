import z from "zod";

export const userZodObject = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});
export type UserType = z.infer<typeof userZodObject>;

export const zodCreateBlogObject = z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.number()
});

export type BlogType = z.infer<typeof zodCreateBlogObject>;
