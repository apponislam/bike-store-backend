import { Types } from "mongoose";

export interface Order {
    user: string | Types.ObjectId;
    product: string | Types.ObjectId;
    quantity: number;
    totalPrice: number;
}
