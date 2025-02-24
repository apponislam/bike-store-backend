import { Request, Response } from "express";
import { orderServices } from "./order.service";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";

export const createMainOrder = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user._id;

    if (!userId) {
        throw new AppError(404, "User not found");
    }

    const orderData = { ...req.body, user: userId };

    const order = await orderServices.createOrder(orderData);

    res.status(200).json({
        message: "Order created successfully",
        status: true,
        data: order,
    });
});

const allOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await orderServices.allOrders();

    res.status(200).json({
        message: "Bikes retrieved successfully",
        status: true,
        data: result,
    });
});

export const getRevenue = catchAsync(async (req: Request, res: Response) => {
    const revenue = await orderServices.calculateTotalRevenue();

    res.status(200).json({
        message: "Revenue calculated successfully",
        status: true,
        data: { totalRevenue: revenue },
    });
});

export const orderController = {
    createMainOrder,
    getRevenue,
    allOrders,
};
