import { Types } from "mongoose";

export interface Order {
    email: string;
    product: string | Types.ObjectId;
    quantity: number;
    totalPrice: number;
}
