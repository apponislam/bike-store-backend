"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String, default: "/src/assets/demo.jpg" },
    category: {
        type: String,
        enum: ["Mountain", "Road", "Hybrid", "Electric"],
        required: true,
    },
    isDelected: { type: Boolean, default: false },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
exports.productModel = (0, mongoose_1.model)("product", productSchema);
