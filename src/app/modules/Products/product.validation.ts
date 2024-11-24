import { z } from "zod";

const productValidation = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    category: z.enum(["Mountain", "Road", "Hybrid", "Electric"], {
        message: "Category must be one of 'Mountain', 'Road', 'Hybrid', or 'Electric'",
    }),
    description: z.string().min(1, { message: "Description is required" }),
    quantity: z.number().int({ message: "Quantity must be an integer" }).nonnegative({ message: "Quantity must be a non-negative number" }),
    inStock: z.boolean({ message: "In-stock status must be a boolean" }),
});

export const updateProductValidation = productValidation.partial();

export default productValidation;
