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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const mongoose_1 = require("mongoose");
const products_model_1 = require("./products.model");
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.productModel.create(product);
    return result;
});
const allProducts = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (searchTerm = "") {
    const filter = searchTerm
        ? {
            $or: [{ name: { $regex: searchTerm, $options: "i" } }, { brand: { $regex: searchTerm, $options: "i" } }, { category: { $regex: searchTerm, $options: "i" } }],
        }
        : {};
    const result = yield products_model_1.productModel.find(filter);
    return result;
});
const productById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    const result = yield products_model_1.productModel.findOne({ _id: id });
    return result;
});
const updateProduct = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    const result = yield products_model_1.productModel.findByIdAndUpdate(id, updateData, { new: true, versionKey: false });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    const result = yield products_model_1.productModel.findByIdAndDelete(id);
    return result;
});
exports.productServices = {
    createProduct,
    allProducts,
    productById,
    updateProduct,
    deleteProduct,
};
