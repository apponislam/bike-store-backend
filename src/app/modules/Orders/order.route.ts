import { Router } from "express";
import auth from "../../middlewares/auth";
import { orderController } from "./order.controller";

const orderRouter = Router();

orderRouter.get("/api/order/verify", auth, orderController.verifyPayment);

orderRouter.route("/api/order").post(auth, orderController.createOrder).get(auth, orderController.getOrders);

export default orderRouter;
