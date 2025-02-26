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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const order_utils_1 = require("./order.utils");
const products_model_1 = require("../Products/products.model");
const createOrder = (user, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length))
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Order is not specified");
    const products = payload.products;
    let totalPrice = 0;
    const productDetails = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield products_model_1.productModel.findById(item.product);
        if (product) {
            const subtotal = product ? (product.price || 0) * item.quantity : 0;
            totalPrice += subtotal;
            return item;
        }
    })));
    let order = yield order_model_1.default.create({
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
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        order = yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_model_1.default.find().populate("products.product").populate("user", "email name");
    return data;
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            "transaction.id": order_id,
        }, {
            "transaction.bank_status": verifiedPayment[0].bank_status,
            "transaction.sp_code": verifiedPayment[0].sp_code,
            "transaction.sp_message": verifiedPayment[0].sp_message,
            "transaction.transactionStatus": verifiedPayment[0].transaction_status,
            "transaction.method": verifiedPayment[0].method,
            "transaction.date_time": verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == "Success" ? "Paid" : verifiedPayment[0].bank_status == "Failed" ? "Pending" : verifiedPayment[0].bank_status == "Cancel" ? "Cancelled" : "",
        });
    }
    return verifiedPayment;
});
const findOrdersByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find({ user: userId }).populate("products.product");
    return orders;
});
const cancelOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }
    if (order.status === "Completed" || order.status === "Cancelled") {
        throw new Error(`Order cannot be cancelled because it is already ${order.status}`);
    }
    order.status = "Cancelled";
    yield order.save();
    return order;
});
const updateOrderAdmin = (orderId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield order_model_1.default.findByIdAndUpdate(orderId, Object.assign({}, updateData), { new: true });
    if (!updatedProduct) {
        throw new AppError_1.default(404, "Product not found");
    }
    return updatedProduct;
});
exports.orderService = {
    createOrder,
    getOrders,
    verifyPayment,
    findOrdersByUser,
    cancelOrder,
    updateOrderAdmin,
};
