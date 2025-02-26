import Order from "./order.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { orderUtils } from "./order.utils";
import { productModel } from "../Products/products.model";

const createOrder = async (user: any, payload: { products: { product: string; quantity: number }[] }, client_ip: string) => {
    if (!payload?.products?.length) throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");

    const products = payload.products;

    let totalPrice = 0;
    const productDetails = await Promise.all(
        products.map(async (item) => {
            const product = await productModel.findById(item.product);
            if (product) {
                const subtotal = product ? (product.price || 0) * item.quantity : 0;
                totalPrice += subtotal;
                return item;
            }
        })
    );

    let order = await Order.create({
        user,
        products: productDetails,
        totalPrice,
    });

    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: user.name,
        customer_address: "N/A",
        customer_email: user.email,
        customer_phone: "N/A",
        customer_city: "N/A",
        client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
        order = await order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }

    return payment.checkout_url;
};

const getOrders = async () => {
    const data = await Order.find().populate("products.product").populate("user", "email name");
    return data;
};

const verifyPayment = async (order_id: string) => {
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

    if (verifiedPayment.length) {
        await Order.findOneAndUpdate(
            {
                "transaction.id": order_id,
            },
            {
                "transaction.bank_status": verifiedPayment[0].bank_status,
                "transaction.sp_code": verifiedPayment[0].sp_code,
                "transaction.sp_message": verifiedPayment[0].sp_message,
                "transaction.transactionStatus": verifiedPayment[0].transaction_status,
                "transaction.method": verifiedPayment[0].method,
                "transaction.date_time": verifiedPayment[0].date_time,
                status: verifiedPayment[0].bank_status == "Success" ? "Paid" : verifiedPayment[0].bank_status == "Failed" ? "Pending" : verifiedPayment[0].bank_status == "Cancel" ? "Cancelled" : "",
            }
        );
    }

    return verifiedPayment;
};

const findOrdersByUser = async (userId: string) => {
    const orders = await Order.find({ user: userId }).populate("products.product");
    return orders;
};

const cancelOrder = async (orderId: string) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.status === "Completed" || order.status === "Cancelled") {
        throw new Error(`Order cannot be cancelled because it is already ${order.status}`);
    }

    order.status = "Cancelled";
    await order.save();

    return order;
};

const updateOrderAdmin = async (orderId: string, updateData: any) => {
    const updatedProduct = await Order.findByIdAndUpdate(orderId, { ...updateData }, { new: true });

    if (!updatedProduct) {
        throw new AppError(404, "Product not found");
    }

    return updatedProduct;
};

export const orderService = {
    createOrder,
    getOrders,
    verifyPayment,
    findOrdersByUser,
    cancelOrder,
    updateOrderAdmin,
};
