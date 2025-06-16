import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import blogValidation from "./blog.validation";

const router = express.Router();

router.post("/api/blogs", auth, validateRequest(blogValidation), blogController.createBlog);

router.get("/api/blogs", blogController.getAllBlogs);
router.get("/api/blogs/:id", blogController.getSingleBlog);
router.patch("/api/blogs/:id", auth, validateRequest(blogValidation.partial()), blogController.updateBlog);
router.delete("/api/blogs/:id", auth, blogController.deleteBlog);

export const blogRoute = router;
