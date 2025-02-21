import { Request, Response } from "express";
import { orderServices } from "./order.service";
import orderValidation from "./order.validation";
import catchAsync from "../../utils/catchAsync";

export const createMainOrder = catchAsync(async (req: Request, res: Response) => {
    const orderData = orderValidation.parse(req.body);
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
