import { z } from "zod";

const blogValidation = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required" }).min(5),
        excerpt: z.string({ required_error: "Excerpt is required" }).min(10),
        content: z.string({ required_error: "Content is required" }).min(50),
        image: z.string({ required_error: "Image URL is required" }).url(),
        category: z.string({ required_error: "Category is required" }),
    }),
});

export default blogValidation;
