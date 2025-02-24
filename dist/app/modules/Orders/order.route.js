"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = __importDefault(require("./order.validation"));
const router = express_1.default.Router();
// POST /api/orders - Create a new order
router.post("/api/orders", auth_1.default, (0, validateRequest_1.default)(order_validation_1.default), order_controller_1.orderController.createMainOrder);
router.get("/api/orders", order_controller_1.orderController.allOrders);
router.get("/api/orders/revenue", order_controller_1.orderController.getRevenue);
exports.orderRoute = router;
