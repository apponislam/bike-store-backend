"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactModel = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false,
});
// Soft delete middleware
contactSchema.pre("find", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
contactSchema.pre("findOne", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
exports.contactModel = (0, mongoose_1.model)("contact", contactSchema);
