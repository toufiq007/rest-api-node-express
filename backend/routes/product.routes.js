import express from "express";
import { productController } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/products", productController.addNewProducts);
router.get("/products/:id", productController.getSingleProduct);
router.delete("/products/:id", productController.removeProduct);
router.put("/products/:id", productController.updateProduct);

export default router;
