"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const blog_validation_1 = __importDefault(require("./blog.validation"));
const router = express_1.default.Router();
router.post("/api/blogs", auth_1.default, (0, validateRequest_1.default)(blog_validation_1.default), blog_controller_1.blogController.createBlog);
router.get("/api/blogs", blog_controller_1.blogController.getAllBlogs);
router.get("/api/blogs/:id", blog_controller_1.blogController.getSingleBlog);
router.patch("/api/blogs/:id", auth_1.default, (0, validateRequest_1.default)(blog_validation_1.default.partial()), blog_controller_1.blogController.updateBlog);
router.delete("/api/blogs/:id", auth_1.default, blog_controller_1.blogController.deleteBlog);
router.get("/api/blogs/me", auth_1.default, blog_controller_1.blogController.getMyBlogs);
exports.blogRoute = router;
