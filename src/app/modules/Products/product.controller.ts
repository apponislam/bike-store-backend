import { Request, Response } from "express";
import { productServices } from "./product.service";
import { ZodError } from "zod";
import productValidation, { updateProductValidation } from "./product.validation";
import { Types } from "mongoose";

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;

        const productValid = productValidation.parse(product);

        const result = await productServices.createProduct(productValid);
        res.status(200).json({
            message: "Bike created successfully",
            status: true,
            data: result,
        });
    } catch (err: any) {
        // res.status(500).json({
        //     message: "Validation failed",
        //     success: false,
        //     error: err,
        // });
        if (err instanceof ZodError) {
            const transformedErrors: Record<string, any> = {};

            err.issues.forEach((issue) => {
                const field = issue.path[0];

                const errorDetails: any = {
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
        } else {
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
};

const allProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm = (req.query.searchTerm as string) || "";
        const result = await productServices.allProducts(searchTerm);

        res.status(200).json({
            message: "Bikes retrieved successfully",
            status: true,
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed retrieving failed",
            error: err,
        });
    }
};

const getProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;

    try {
        const product = await productServices.productById(productId);

        if (!product) {
            res.status(404).json({
                status: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            status: true,
            message: "Product retrieved successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed retrieving product",
            data: error,
        });
    }
};

const updateProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const updateData = req.body;

    try {
        if (!Types.ObjectId.isValid(productId)) {
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

        const productValid = updateProductValidation.parse(updateData);

        const updatedProduct = await productServices.updateProduct(productId, productValid);

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
    } catch (err: any) {
        // res.status(500).json({
        //     status: false,
        //     message: "Product updated failed",
        //     error: err,
        // });

        if (err instanceof ZodError) {
            // Map Zod error to your custom format
            const transformedErrors: Record<string, any> = {};

            err.issues.forEach((issue) => {
                const field = issue.path[0];

                const errorDetails: any = {
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
        } else {
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
};

const deleteProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;

    try {
        const deletedProduct = await productServices.deleteProduct(productId);

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
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Product delete failed",
            error: error,
        });
    }
};

export const productController = {
    createProduct,
    allProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
