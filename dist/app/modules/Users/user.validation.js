"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidation = exports.changePasswordValidationSchema = exports.refreshTokenValidation = exports.userLoginValidation = void 0;
const zod_1 = require("zod");
const userValidation = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string({ required_error: "Name is required" }).min(1, { message: "Name is required" }),
        email: zod_1.z.string({ required_error: "Email is required" }).email({ message: "Invalid email format" }).min(1, { message: "Email is required" }),
        password: zod_1.z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" }).min(1, { message: "Password is required" }),
        photo: zod_1.z.string().url({ message: "Invalid photo URL" }).optional(),
        role: zod_1.z.enum(["admin", "customer"], { message: "Role must be 'admin' or 'customer'" }),
        status: zod_1.z.enum(["active", "blocked"]).default("active"),
    })
        .strict(),
});
exports.userLoginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }).email("Invalid email format").nonempty("Email is required"),
        password: zod_1.z.string({ required_error: "Password is required" }).nonempty("Password is required").min(4, "Password must be at least 6 characters long"),
    }),
});
exports.refreshTokenValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});
exports.changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: "Old password is required",
        }),
        newPassword: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
exports.userUpdateValidation = userValidation.partial();
exports.default = userValidation;
