import { Types } from "mongoose";
import { Product } from "./products.interface";
import { productModel } from "./products.model";
import { getFilter } from "../../utils/getFilter";

const createProduct = async (product: Product) => {
    const result = await productModel.create(product);
    return result;
};

const allProducts = async (searchTerm: string = "", minPrice?: number, maxPrice?: number, brand?: string, category?: string, inStock?: boolean) => {
    const filter = getFilter(searchTerm, minPrice, maxPrice, brand, category, inStock);

    const result = await productModel.find(filter).populate("user", "-password");
    return result;
};

const productById = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    const result = await productModel.findOne({ _id: id }).populate("user", "-password");
    return result;
};

const updateProduct = async (id: string, updateData: Partial<Product>) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }

    const result = await productModel.findByIdAndUpdate(id, updateData, { new: true, versionKey: false });
    return result;
};

const deleteProduct = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }

    const result = await productModel.findByIdAndDelete(id);
    return result;
};

export const productServices = {
    createProduct,
    allProducts,
    productById,
    updateProduct,
    deleteProduct,
};
