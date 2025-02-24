"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
exports.orderModel = (0, mongoose_1.model)("Order", orderSchema);
