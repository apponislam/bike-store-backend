"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const order_controller_1 = require("./order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.get("/api/order/verify", auth_1.default, order_controller_1.orderController.verifyPayment);
orderRouter.route("/api/order").post(auth_1.default, order_controller_1.orderController.createOrder).get(auth_1.default, order_controller_1.orderController.getOrders);
exports.default = orderRouter;
