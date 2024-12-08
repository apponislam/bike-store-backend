import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

router.post("/api/products", productController.createProduct);

router.get("/api/products", productController.allProducts);

router.get("/api/products/:productId", productController.getProduct);

router.put("/api/products/:productId", productController.updateProduct);

router.delete("/api/products/:productId", productController.deleteProduct);

export const productRoute = router;
