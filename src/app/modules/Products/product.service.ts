import { Types } from "mongoose";
import { Product } from "./products.interface";
import { productModel } from "./products.model";

const createProduct = async (product: Product) => {
    const result = await productModel.create(product);
    return result;
};

const allProducts = async (searchTerm: string = "") => {
    const filter = searchTerm
        ? {
              $or: [{ name: { $regex: searchTerm, $options: "i" } }, { brand: { $regex: searchTerm, $options: "i" } }, { category: { $regex: searchTerm, $options: "i" } }],
          }
        : {};
    const result = await productModel.find(filter);
    return result;
};

const productById = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    const result = await productModel.findOne({ _id: id });
    return result;
};

const updateProduct = async (id: string, updateData: Partial<Product>) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }

    const result = await productModel.findByIdAndUpdate(id, updateData, { new: true });
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
