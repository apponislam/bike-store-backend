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
const order_validation_1 = __importDefault(require("./order.validation"));
const createMainOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = order_validation_1.default.parse(req.body);
        const order = yield order_service_1.orderServices.createOrder(orderData);
        res.status(200).json({
            message: "Order created successfully",
            status: true,
            data: order,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                message: "Product not found",
                success: false,
                error: err,
            });
        }
        else {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                error: err,
            });
        }
    }
});
exports.createMainOrder = createMainOrder;
const allOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderServices.allOrders();
        res.status(200).json({
            message: "Bikes retrieved successfully",
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed retrieving failed",
            error: err,
        });
    }
});
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = yield order_service_1.orderServices.calculateTotalRevenue();
        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: { totalRevenue: revenue },
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error calculating revenue",
            success: false,
            error: err,
        });
    }
});
exports.getRevenue = getRevenue;
exports.orderController = {
    createMainOrder: exports.createMainOrder,
    getRevenue: exports.getRevenue,
    allOrders,
};
