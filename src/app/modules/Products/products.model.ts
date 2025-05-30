import { Query, Schema, model } from "mongoose";
import { Product } from "./products.interface";
import { NextFunction } from "express";

const productSchema = new Schema<Product>(
    {
        name: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "user", required: true },
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
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

productSchema.pre("find", function (this: Query<any, Document>, next) {
    this.where({ isDelected: { $ne: true } });
    next();
});

productSchema.pre("findOne", function (this: Query<any, Document>, next) {
    this.where({ isDelected: { $ne: true } });
    next();
});

productSchema.pre("findOneAndUpdate", function (this: Query<any, Document>, next) {
    this.where({ isDelected: { $ne: true } });
    next();
});

productSchema.pre("updateOne", function (this: Query<any, Document>, next) {
    this.where({ isDelected: { $ne: true } });
    next();
});

productSchema.pre("findOneAndUpdate", function (this: Query<any, Document>, next) {
    this.where({ isDelected: { $ne: true } });
    next();
});

export const productModel = model<Product>("product", productSchema);
