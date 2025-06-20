"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const blogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Title is required" }).min(5),
        excerpt: zod_1.z.string({ required_error: "Excerpt is required" }).min(10),
        content: zod_1.z.string({ required_error: "Content is required" }).min(50),
        image: zod_1.z.string({ required_error: "Image URL is required" }).url(),
        category: zod_1.z.string({ required_error: "Category is required" }),
    }),
});
exports.default = blogValidation;
