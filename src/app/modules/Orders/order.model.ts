import { Schema, model } from "mongoose";
import { Order } from "./order.interface";

const orderSchema = new Schema<Order>(
    {
        email: { type: String, required: true },
        product: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const orderModel = model<Order>("Order", orderSchema);
