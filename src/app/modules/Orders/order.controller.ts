import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import httpStatus from "http-status";
import { orderService } from "./order.service";

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

export const orderController = { createOrder, verifyPayment, getOrders };
