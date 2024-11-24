"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    brand: zod_1.z.string().min(1, { message: "Brand is required" }),
    price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
    category: zod_1.z.enum(["Mountain", "Road", "Hybrid", "Electric"], {
        message: "Category must be one of 'Mountain', 'Road', 'Hybrid', or 'Electric'",
    }),
    description: zod_1.z.string().min(1, { message: "Description is required" }),
    quantity: zod_1.z.number().int({ message: "Quantity must be an integer" }).nonnegative({ message: "Quantity must be a non-negative number" }),
    inStock: zod_1.z.boolean({ message: "In-stock status must be a boolean" }),
});
exports.default = productValidation;
