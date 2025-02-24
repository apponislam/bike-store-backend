import express from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import orderValidation from "./order.validation";

const router = express.Router();

// POST /api/orders - Create a new order
router.post("/api/orders", auth, validateRequest(orderValidation), orderController.createMainOrder);

router.get("/api/orders", orderController.allOrders);

router.get("/api/orders/revenue", orderController.getRevenue);

export const orderRoute = router;
