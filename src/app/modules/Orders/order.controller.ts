import { Request, Response } from "express";
import { orderServices } from "./order.service";
import orderValidation from "./order.validation";

export const createMainOrder = async (req: Request, res: Response) => {
    try {
        const orderData = orderValidation.parse(req.body);
        const order = await orderServices.createOrder(orderData);

        res.status(200).json({
            message: "Order created successfully",
            status: true,
            data: order,
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                message: "Product not found",
                success: false,
                error: err,
            });
        } else {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                error: err,
            });
        }
    }
};

export const getRevenue = async (req: Request, res: Response) => {
    try {
        const revenue = await orderServices.calculateTotalRevenue();

        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: { totalRevenue: revenue },
        });
    } catch (err) {
        res.status(500).json({
            message: "Error calculating revenue",
            success: false,
            error: err,
        });
    }
};

export const orderController = {
    createMainOrder,
    getRevenue,
};
