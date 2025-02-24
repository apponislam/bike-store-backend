import { Types } from "mongoose";

export type Product = {
    name: string;
    user: string | Types.ObjectId;
    brand: string;
    price: number;
    photo?: string;
    category: "Mountain" | "Road" | "Hybrid" | "Electric";
    description: string;
    quantity: number;
    isDelected?: boolean;
    inStock: boolean;
};
