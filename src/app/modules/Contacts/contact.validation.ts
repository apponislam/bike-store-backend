import { z } from "zod";

const contactValidation = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }).min(1),
        email: z.string({ required_error: "Email is required" }).email(),
        subject: z.string({ required_error: "Subject is required" }).min(5),
        message: z.string({ required_error: "Message is required" }).min(10),
    }),
});

export default contactValidation;
