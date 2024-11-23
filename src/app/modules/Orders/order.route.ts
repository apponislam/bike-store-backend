import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

// POST /api/orders - Create a new order
router.post("/api/orders", orderController.createMainOrder);

router.get("/api/orders/revenue", orderController.getRevenue);

export const orderRoute = router;
