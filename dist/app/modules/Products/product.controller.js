"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const zod_1 = require("zod");
const product_validation_1 = __importStar(require("./product.validation"));
const mongoose_1 = require("mongoose");
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
        // res.status(500).json({
        //     message: "Validation failed",
        //     success: false,
        //     error: err,
        // });
        if (err instanceof zod_1.ZodError) {
            const transformedErrors = {};
            err.issues.forEach((issue) => {
                const field = issue.path[0];
                const errorDetails = {
                    message: issue.message,
                    name: "ValidatorError",
                    properties: {
                        message: issue.message,
                        type: issue.code,
                    },
                    kind: issue.code,
                    path: field,
                    value: req.body[field],
                };
                if (issue.code === "too_small" && "minimum" in issue) {
                    errorDetails.properties.min = issue.minimum;
                }
                transformedErrors[field] = errorDetails;
            });
            res.status(400).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "ValidationError",
                    errors: transformedErrors,
                },
                stack: err.stack,
            });
        }
        else {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                error: {
                    message: err.message,
                    stack: err.stack,
                },
            });
        }
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
            return;
        }
        res.status(200).json({
            status: true,
            message: "Product retrieved successfully",
            data: product,
        });
    }
    catch (error) {
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
        if (!mongoose_1.Types.ObjectId.isValid(productId)) {
            res.status(404).json({
                message: "Invalid ID Not Found",
                success: false,
                error: {
                    name: "ValidationError",
                    errors: {
                        productId: {
                            message: "Invalid ID Not Found",
                            name: "ValidatorError",
                            properties: {
                                message: "Invalid ID Not Found",
                                type: "type_error",
                            },
                            kind: "type_error",
                            path: "productId",
                            value: productId,
                        },
                    },
                },
            });
        }
        const productValid = product_validation_1.updateProductValidation.parse(updateData);
        const updatedProduct = yield product_service_1.productServices.updateProduct(productId, productValid);
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
    catch (err) {
        // res.status(500).json({
        //     status: false,
        //     message: "Product updated failed",
        //     error: err,
        // });
        if (err instanceof zod_1.ZodError) {
            // Map Zod error to your custom format
            const transformedErrors = {};
            err.issues.forEach((issue) => {
                const field = issue.path[0];
                const errorDetails = {
                    message: issue.message,
                    name: "ValidatorError",
                    properties: {
                        message: issue.message,
                        type: issue.code,
                    },
                    kind: issue.code,
                    path: field,
                    value: req.body[field],
                };
                if (issue.code === "too_small" && "minimum" in issue) {
                    errorDetails.properties.min = issue.minimum;
                }
                transformedErrors[field] = errorDetails;
            });
            res.status(400).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "ValidationError",
                    errors: transformedErrors,
                },
                stack: err.stack,
            });
        }
        else {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                error: {
                    message: err.message,
                    stack: err.stack,
                },
            });
        }
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
            data: {},
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
