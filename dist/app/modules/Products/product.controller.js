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
exports.productController = void 0;
const product_service_1 = require("./product.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        throw new AppError_1.default(404, "User not found");
    }
    const product = Object.assign(Object.assign({}, req.body), { user: userId });
    const result = yield product_service_1.productServices.createProduct(product);
    res.status(200).json({
        message: "Bike created successfully",
        status: true,
        data: result,
    });
}));
const allProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice, maxPrice, brand, category, inStock } = req.query;
    const parsedMinPrice = minPrice ? Number(minPrice) : undefined;
    const parsedMaxPrice = maxPrice ? Number(maxPrice) : undefined;
    const parsedInStock = inStock ? inStock === "true" : undefined;
    const result = yield product_service_1.productServices.allProducts(searchTerm || "", parsedMinPrice, parsedMaxPrice, brand, category, parsedInStock);
    res.status(200).json({
        message: "Bikes retrieved successfully",
        status: true,
        data: result,
    });
}));
const allProductsBrand = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productServices.allProductsBrand();
    res.status(200).json({
        message: "Bikes retrieved successfully",
        status: true,
        data: result,
    });
}));
const getProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const product = yield product_service_1.productServices.productById(productId);
    if (!product) {
        res.status(404).json({
            status: false,
            message: "Product not found",
            error: "",
        });
        return;
    }
    res.status(200).json({
        status: true,
        message: "Product retrieved successfully",
        data: product,
    });
}));
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const updateData = req.body;
    const user = req.user;
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    const updatedProduct = yield product_service_1.productServices.updateProduct(productId, updateData);
    if (!updatedProduct) {
        res.status(404).json({
            status: false,
            message: "Product not found",
        });
    }
    res.status(200).json({
        status: true,
        message: "Product updated successfully",
        data: updatedProduct,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const user = req.user;
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    const deletedProduct = yield product_service_1.productServices.deleteProduct(productId);
    if (!deletedProduct) {
        res.status(404).json({
            status: false,
            message: "Product not found",
        });
    }
    res.status(200).json({
        status: true,
        message: "Product deleted successfully",
        data: {},
    });
}));
exports.productController = {
    createProduct,
    allProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    allProductsBrand,
};
