"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = exports.getRevenue = exports.createMainOrder = void 0;
const order_service_1 = require("./order.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
exports.createMainOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    if (!userId) {
        throw new AppError_1.default(404, "User not found");
    }
    const orderData = Object.assign(Object.assign({}, req.body), { user: userId });
    const order = yield order_service_1.orderServices.createOrder(orderData);
    res.status(200).json({
        message: "Order created successfully",
        status: true,
        data: order,
    });
}));
const allOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderServices.allOrders();
    res.status(200).json({
        message: "Bikes retrieved successfully",
        status: true,
        data: result,
    });
}));
exports.getRevenue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const revenue = yield order_service_1.orderServices.calculateTotalRevenue();
    res.status(200).json({
        message: "Revenue calculated successfully",
        status: true,
        data: { totalRevenue: revenue },
    });
}));
exports.orderController = {
    createMainOrder: exports.createMainOrder,
    getRevenue: exports.getRevenue,
    allOrders,
};
