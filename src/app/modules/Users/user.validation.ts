import { z } from "zod";

const userValidation = z.object({
    body: z
        .object({
            name: z.string({ required_error: "Name is required" }).min(1, { message: "Name is required" }),
            email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email format" }).min(1, { message: "Email is required" }),
            password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" }).min(1, { message: "Password is required" }),
            photo: z.string().url({ message: "Invalid photo URL" }).optional(),
            role: z.enum(["admin", "customer"], { message: "Role must be 'admin' or 'customer'" }),
        })
        .strict(),
});

export const userLoginValidation = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }).email("Invalid email format").nonempty("Email is required"),
        password: z.string({ required_error: "Password is required" }).nonempty("Password is required").min(4, "Password must be at least 6 characters long"),
    }),
});

export const refreshTokenValidation = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});

export const userUpdateValidation = userValidation.partial();

export default userValidation;
