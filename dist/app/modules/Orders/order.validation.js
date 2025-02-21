"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidation = zod_1.z.object({
    email: zod_1.z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }), // Ensure it's a valid email
    product: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid product ID" }), // Valid ObjectId (24 hex characters)
    quantity: zod_1.z.number().int().positive({ message: "Quantity must be a positive integer" }), // Ensure positive integer
    totalPrice: zod_1.z.number().positive({ message: "Total price must be a positive number" }), // Ensure positive total price
});
exports.default = orderValidation;
