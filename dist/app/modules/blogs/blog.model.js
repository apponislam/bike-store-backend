"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            ret.id = ret._id;
            return ret;
        },
    },
});
blogSchema.pre("find", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
blogSchema.pre("findOne", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
exports.blogModel = (0, mongoose_1.model)("Blog", blogSchema);
