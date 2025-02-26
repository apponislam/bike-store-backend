import { Router } from "express";
import auth from "../../middlewares/auth";
import { orderController } from "./order.controller";

const orderRouter = Router();

orderRouter.get("/api/order/verify", auth, orderController.verifyPayment);

orderRouter.route("/api/order").post(auth, orderController.createOrder).get(auth, orderController.getOrders);

orderRouter.get("/api/orders", auth, orderController.getOrdersByUser);

orderRouter.patch("/api/orders/:orderId/cancel", auth, orderController.cancelOrder);

orderRouter.put("/api/orders/:orderId/update", auth, orderController.updateOrderAdmin);

export default orderRouter;
