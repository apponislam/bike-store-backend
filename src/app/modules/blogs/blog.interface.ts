import { Types } from "mongoose";

export type Blog = {
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: Types.ObjectId;
    category: string;
    isDeleted?: boolean;
};
