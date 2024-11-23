import { Request, Response } from "express";
import { productServices } from "./product.service";
import productValidation from "./product.validation";

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
    } catch (err) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: err,
        });
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

        // If product found, return the product data
        res.status(200).json({
            status: true,
            message: "Product retrieved successfully",
            data: product,
        });
    } catch (error) {
        // In case of any error during fetching, return a 500 error response
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
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Product updated failed",
            error: error,
        });
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
