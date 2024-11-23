import { z } from "zod";

const orderValidation = z.object({
    email: z.string().email({ message: "Invalid email address" }), // Ensure it's a valid email
    product: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid product ID" }), // Valid ObjectId (24 hex characters)
    quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }), // Ensure positive integer
    totalPrice: z.number().positive({ message: "Total price must be a positive number" }), // Ensure positive total price
});

export default orderValidation;
