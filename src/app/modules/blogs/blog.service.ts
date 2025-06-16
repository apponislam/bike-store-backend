import { Blog } from "./blog.interface";
import { blogModel } from "./blog.model";
import { Types } from "mongoose";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createBlog = async (blogData: Blog) => {
    return await blogModel.create(blogData);
};

const getAllBlogs = async () => {
    return await blogModel.find().populate("author", "name email").sort({ createdAt: -1 });
};

const getSingleBlog = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid blog ID");
    }
    const result = await blogModel.findById(id).populate("author", "name email");
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
    }
    return result;
};

const updateBlog = async (id: string, payload: Partial<Blog>, userId: Types.ObjectId) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid blog ID");
    }

    const blog = await blogModel.findById(id);
    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
    }

    if (!blog.author.equals(userId)) {
        throw new AppError(httpStatus.FORBIDDEN, "You can only update your own blogs");
    }

    return await blogModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteBlog = async (id: string, userId: Types.ObjectId) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid blog ID");
    }

    const blog = await blogModel.findById(id);
    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
    }

    if (!blog.author.equals(userId)) {
        throw new AppError(httpStatus.FORBIDDEN, "You can only delete your own blogs");
    }

    return await blogModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export const blogServices = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};
