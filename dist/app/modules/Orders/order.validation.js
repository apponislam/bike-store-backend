"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidation = zod_1.z.object({
    body: zod_1.z.object({
        product: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid product ID" }),
        quantity: zod_1.z.number().int().positive({ message: "Quantity must be a positive integer" }),
        totalPrice: zod_1.z.number().positive({ message: "Total price must be a positive number" }),
    }),
});
exports.default = orderValidation;
