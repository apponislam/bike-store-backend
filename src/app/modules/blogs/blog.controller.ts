import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { blogServices } from "./blog.service";

const createBlog = catchAsync(async (req: Request, res: Response) => {
    const blogData = { ...req.body, author: req.user._id };
    const result = await blogServices.createBlog(blogData);

    res.status(201).json({
        status: true,
        message: "Blog created successfully",
        data: result,
    });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const result = await blogServices.getAllBlogs();
    res.status(200).json({
        status: true,
        message: "Blogs retrieved successfully",
        data: result,
    });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await blogServices.getSingleBlog(id);
    res.status(200).json({
        status: true,
        message: "Blog retrieved successfully",
        data: result,
    });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await blogServices.updateBlog(id, req.body, req.user._id);
    res.status(200).json({
        status: true,
        message: "Blog updated successfully",
        data: result,
    });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await blogServices.deleteBlog(id, req.user._id);
    res.status(200).json({
        status: true,
        message: "Blog deleted successfully",
        data: result,
    });
});

const getMyBlogs = catchAsync(async (req: Request, res: Response) => {
    const result = await blogServices.getMyBlogs(req.user._id);

    res.status(200).json({
        status: true,
        message: "Your blogs retrieved successfully",
        data: result,
    });
});

export const blogController = {
    createBlog,
    getAllBlogs,
    getMyBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};
