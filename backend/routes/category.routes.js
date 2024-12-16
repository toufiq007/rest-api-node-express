import express from "express"
import { categoryController } from "../controllers/category.controller"

const router = express.Router()

router.get('/category',categoryController.getAllCategory)
router.post('/category',categoryController.createCategory)
router.put('/category/:categoryId',categoryController.updateCategory)
router.delete('/category/:categoryId',categoryController.deleteCategory)

export default router