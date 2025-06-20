import { Schema, model, Types } from "mongoose";
import { Blog } from "./blog.interface";

const blogSchema = new Schema<Blog>(
    {
        title: { type: String, required: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },
        category: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
    }
);

blogSchema.pre("find", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

blogSchema.pre("findOne", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

export const blogModel = model<Blog>("Blog", blogSchema);
