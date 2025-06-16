"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServices = void 0;
const blog_model_1 = require("./blog.model");
const mongoose_1 = require("mongoose");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createBlog = (blogData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.blogModel.create(blogData);
});
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.blogModel.find().populate("author", "name email photo role").sort({ createdAt: -1 });
});
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid blog ID");
    }
    const result = yield blog_model_1.blogModel.findById(id).populate("author", "name email photo role");
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    return result;
});
const updateBlog = (id, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid blog ID");
    }
    const blog = yield blog_model_1.blogModel.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    if (!blog.author.equals(userId)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You can only update your own blogs");
    }
    return yield blog_model_1.blogModel.findByIdAndUpdate(id, payload, { new: true });
});
const deleteBlog = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid blog ID");
    }
    const blog = yield blog_model_1.blogModel.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    if (!blog.author.equals(userId)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You can only delete your own blogs");
    }
    return yield blog_model_1.blogModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
});
exports.blogServices = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};
