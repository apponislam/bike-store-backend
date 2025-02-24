import { z } from "zod";

const orderValidation = z.object({
    body: z.object({
        product: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid product ID" }),
        quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
        totalPrice: z.number().positive({ message: "Total price must be a positive number" }),
    }),
});

export default orderValidation;
