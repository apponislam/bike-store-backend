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
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const productValid = product_validation_1.default.parse(product);
        const result = yield product_service_1.productServices.createProduct(productValid);
        res.status(200).json({
            message: "Bike created successfully",
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: err,
        });
    }
});
const allProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm || "";
        const result = yield product_service_1.productServices.allProducts(searchTerm);
        res.status(200).json({
            message: "Bikes retrieved successfully",
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed retrieving failed",
            error: err,
        });
    }
});
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const product = yield product_service_1.productServices.productById(productId);
        if (!product) {
            res.status(404).json({
                status: false,
                message: "Product not found",
            });
        }
        // If product found, return the product data
        res.status(200).json({
            status: true,
            message: "Product retrieved successfully",
            data: product,
        });
    }
    catch (error) {
        // In case of any error during fetching, return a 500 error response
        res.status(500).json({
            status: false,
            message: "Failed retrieving product",
            data: error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const updateData = req.body;
    try {
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
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Product updated failed",
            error: error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
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
            data: deletedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Product delete failed",
            error: error,
        });
    }
});
exports.productController = {
    createProduct,
    allProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
