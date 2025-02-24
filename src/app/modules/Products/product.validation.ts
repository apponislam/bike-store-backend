import { z } from "zod";

const productValidation = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }).min(1, { message: "Name is required" }),
        // user: z.string({ required_error: "User ID is required" }),
        brand: z.string({ required_error: "Brand is required" }).min(1, { message: "Brand is required" }),
        price: z.number({ required_error: "Price is required" }).positive({ message: "Price must be a positive number" }),
        photo: z.string().optional(),
        category: z.enum(["Mountain", "Road", "Hybrid", "Electric"], {
            message: "Category must be one of 'Mountain', 'Road', 'Hybrid', or 'Electric'",
        }),
        description: z.string({ required_error: "Description is required" }).min(1, { message: "Description is required" }),
        quantity: z.number().int().positive({ message: "Quantity must be an positive number" }).nonnegative({ message: "Quantity must be a non-negative number" }),
        isDeleted: z.boolean().default(false),
        inStock: z.boolean({ message: "In-stock status must be a boolean" }),
    }),
});

export const updateProductValidation = productValidation.partial();

export default productValidation;
