import express from "express";
import { productController } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/products", productController.addNewProducts);
router.get("/getProducts/:id", productController.getSingleProduct);
router.delete("/removeProduct/:id", productController.removeProduct);
router.put("/updateProducts/:id", productController.updateProduct);

export default router;
