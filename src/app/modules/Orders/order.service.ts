import { productModel } from "../Products/products.model";
import { Order } from "./order.interface";
import { orderModel } from "./order.model";

const createOrder = async (orderData: Order) => {
    const product = await productModel.findById(orderData.product);

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

    await product.save();

    const result = await orderModel.create(orderData);
    return result;
};

const allOrders = async () => {
    const result = await orderModel.find();
    return result;
};

const calculateTotalRevenue = async () => {
    try {
        const totalRevenue = await orderModel.aggregate([
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
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error("Error calculating total revenue: " + err.message);
        } else {
            throw new Error("Unknown error occurred while calculating revenue");
        }
    }
};

export const orderServices = {
    createOrder,
    calculateTotalRevenue,
    allOrders,
};
