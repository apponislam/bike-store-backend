"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/Products/product.route");
const order_route_1 = require("./app/modules/Orders/order.route");
const user_route_1 = require("./app/modules/Users/user.route");
const globalErrorHandler_1 = __importDefault(require("./app/errors/globalErrorHandler"));
const notFount_1 = __importDefault(require("./app/errors/notFount"));
const app = (0, express_1.default)();
// const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", product_route_1.productRoute);
app.use("/", order_route_1.orderRoute);
app.use("/", user_route_1.userRoute);
app.get("/", (req, res) => {
    res.send("Bike Store is available");
});
app.use(globalErrorHandler_1.default);
app.use(notFount_1.default);
exports.default = app;
