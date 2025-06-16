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
exports.blogController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const blog_service_1 = require("./blog.service");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogData = Object.assign(Object.assign({}, req.body), { author: req.user._id });
    const result = yield blog_service_1.blogServices.createBlog(blogData);
    res.status(201).json({
        status: true,
        message: "Blog created successfully",
        data: result,
    });
}));
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogServices.getAllBlogs();
    res.status(200).json({
        status: true,
        message: "Blogs retrieved successfully",
        data: result,
    });
}));
const getSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.blogServices.getSingleBlog(id);
    res.status(200).json({
        status: true,
        message: "Blog retrieved successfully",
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.blogServices.updateBlog(id, req.body, req.user._id);
    res.status(200).json({
        status: true,
        message: "Blog updated successfully",
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.blogServices.deleteBlog(id, req.user._id);
    res.status(200).json({
        status: true,
        message: "Blog deleted successfully",
        data: result,
    });
}));
const getMyBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {
        category: req.query.category,
        status: req.query.status,
        search: req.query.search,
    };
    const result = yield blog_service_1.blogServices.getMyBlogs(req.user._id, filters);
    res.status(200).json({
        status: true,
        message: "Your blogs retrieved successfully",
        data: result,
    });
}));
exports.blogController = {
    createBlog,
    getAllBlogs,
    getMyBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};
