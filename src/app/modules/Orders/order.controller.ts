import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import httpStatus from "http-status";
import { orderService } from "./order.service";
import AppError from "../../errors/AppError";
import { Request, Response } from "express";

const createOrder = catchAsync(async (req, res) => {
    const user = req.user;

    // console.log(req.body);

    const order = await orderService.createOrder(user, req.body, req.ip!);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Order placed successfully",
        data: order,
    });
});

const getOrders = catchAsync(async (req, res) => {
    const order = await orderService.getOrders();

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Order retrieved successfully",
        data: order,
    });
});

const verifyPayment = catchAsync(async (req, res) => {
    const order = await orderService.verifyPayment(req.query.order_id as string);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Order verified successfully",
        data: order,
    });
});

const getOrdersByUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        throw new AppError(401, "Unauthorized access");
    }

    const orders = await orderService.findOrdersByUser(user._id);

    if (!orders.length) {
        throw new AppError(404, "No order found for this user");
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order retrived successfully",
        data: orders,
    });
});

const cancelOrder = catchAsync(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const user = req.user;

    if (!user) {
        throw new AppError(401, "Unauthorized access");
    }

    const cancelledOrder = await orderService.cancelOrder(orderId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order cancelled successfully",
        data: cancelledOrder,
    });
});

const updateOrderAdmin = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        throw new AppError(401, "You are unauthorized");
    }

    const { orderId } = req.params;
    const updatedProduct = await orderService.updateOrderAdmin(orderId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order updated successfully",
        data: updatedProduct,
    });
};

export const orderController = { createOrder, verifyPayment, getOrders, getOrdersByUser, cancelOrder, updateOrderAdmin };
