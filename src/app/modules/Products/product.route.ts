import express from "express";
import { productController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import productValidation, { updateProductValidation } from "./product.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/api/products", auth, validateRequest(productValidation), productController.createProduct);

router.get("/api/products", productController.allProducts);

router.get("/api/productsBrand", productController.allProductsBrand);

router.get("/api/products/:productId", productController.getProduct);

router.put("/api/products/:productId", auth, validateRequest(updateProductValidation), productController.updateProduct);

router.delete("/api/products/:productId", auth, productController.deleteProduct);

export const productRoute = router;
