"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const contactValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }).min(1),
        email: zod_1.z.string({ required_error: "Email is required" }).email(),
        subject: zod_1.z.string({ required_error: "Subject is required" }).min(5),
        message: zod_1.z.string({ required_error: "Message is required" }).min(10),
    }),
});
exports.default = contactValidation;
