"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidation = void 0;
const zod_1 = require("zod");
const productValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }).min(1, { message: "Name is required" }),
        // user: z.string({ required_error: "User ID is required" }),
        brand: zod_1.z.string({ required_error: "Brand is required" }).min(1, { message: "Brand is required" }),
        price: zod_1.z.number({ required_error: "Price is required" }).positive({ message: "Price must be a positive number" }),
        photo: zod_1.z.string().optional(),
        category: zod_1.z.enum(["Mountain", "Road", "Hybrid", "Electric"], {
            message: "Category must be one of 'Mountain', 'Road', 'Hybrid', or 'Electric'",
        }),
        description: zod_1.z.string({ required_error: "Description is required" }).min(1, { message: "Description is required" }),
        quantity: zod_1.z.number().int().positive({ message: "Quantity must be an positive number" }).nonnegative({ message: "Quantity must be a non-negative number" }),
        isDeleted: zod_1.z.boolean().default(false),
        inStock: zod_1.z.boolean({ message: "In-stock status must be a boolean" }),
    }),
});
exports.updateProductValidation = zod_1.z.object({
    body: productValidation.shape.body.partial(),
});
exports.default = productValidation;
