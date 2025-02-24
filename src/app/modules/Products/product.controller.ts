import { Request, Response } from "express";
import { productServices } from "./product.service";
import { ZodError } from "zod";
import productValidation, { updateProductValidation } from "./product.validation";
import { Types } from "mongoose";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";

const createProduct = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new AppError(404, "User not found");
    }

    const product = { ...req.body, user: userId };

    const result = await productServices.createProduct(product);
    res.status(200).json({
        message: "Bike created successfully",
        status: true,
        data: result,
    });
});

const allProducts = catchAsync(async (req: Request, res: Response) => {
    const { searchTerm, minPrice, maxPrice, brand, category, inStock } = req.query;

    const parsedMinPrice = minPrice ? Number(minPrice) : undefined;
    const parsedMaxPrice = maxPrice ? Number(maxPrice) : undefined;

    const parsedInStock = inStock ? inStock === "true" : undefined;

    const result = await productServices.allProducts((searchTerm as string) || "", parsedMinPrice, parsedMaxPrice, brand as string, category as string, parsedInStock);

    res.status(200).json({
        message: "Bikes retrieved successfully",
        status: true,
        data: result,
    });
});

const getProduct = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;

    const product = await productServices.productById(productId);

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
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const updateData = req.body;

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

    const updatedProduct = await productServices.updateProduct(productId, updateData);

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
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;

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
        data: {},
    });
});

export const productController = {
    createProduct,
    allProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
