import express from "express";
import { productController } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/getProducts", productController.getAllProducts);
router.post("/addProducts", productController.addNewProducts);
router.get("/getProducts/:id", productController.getSingleProduct);
router.delete("/removeProduct/:id", productController.removeProduct);
router.put("/updateProducts/:id", productController.updateProduct);

export default router;
