import { Schema, model } from "mongoose";
import { Contact } from "./contact.interface";

const contactSchema = new Schema<Contact>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Soft delete middleware
contactSchema.pre("find", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

contactSchema.pre("findOne", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

export const contactModel = model<Contact>("contact", contactSchema);
