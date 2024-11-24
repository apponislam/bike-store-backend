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
exports.orderServices = void 0;
const products_model_1 = require("../Products/products.model");
const order_model_1 = require("./order.model");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.productModel.findById(orderData.product);
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.quantity < orderData.quantity) {
        throw new Error("Insufficient stock");
    }
    product.quantity -= orderData.quantity;
    if (product.quantity === 0) {
        product.inStock = false;
    }
    yield product.save();
    const result = yield order_model_1.orderModel.create(orderData);
    return result;
});
const allOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.orderModel.find();
    return result;
});
const calculateTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_model_1.orderModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            { $unwind: "$productDetails" },
            {
                $project: {
                    revenue: {
                        $multiply: ["$quantity", "$productDetails.price"],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$revenue" },
                },
            },
        ]);
        return totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error("Error calculating total revenue: " + err.message);
        }
        else {
            throw new Error("Unknown error occurred while calculating revenue");
        }
    }
});
exports.orderServices = {
    createOrder,
    calculateTotalRevenue,
    allOrders,
};
