import mongoose from "mongoose";
import { Category } from "../models/categories.models.js";

// created category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(422).json({ error: "name is required!" });
    }
    const findCategory = await Category.findOne({ name });
    // check if the category is already present or not
    // if present then send error
    if (findCategory) {
      return res
        .status(409)
        .json({ error: `Category ${name} is already present` });
    }
    // if not then create the category
    const category = await Category.create({ name });
    return res
      .status(200)
      .json({ message: "category created successfully", data: category });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// get category
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().select("-__v");
    return res.status(200).json({ success: true, date: categories });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// update category
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const updateCategory = req.body;
    if (!mongoose.isValidObjectId(categoryId)) {
      return (422).json({ message: "Parameter is not valid id" });
    }
    const updateData = await Category.findByIdAndUpdate(
      categoryId,
      updateCategory,
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "category updated successfully", data: updateData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!mongoose.isValidObjectId(categoryId)) {
      return res.status(422).json({ error: "Parameter is not valid id" });
    }
    const findCategory = await Category.findById(categoryId);
    if (!findCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    await Category.findByIdAndDelete(categoryId);
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

export const categoryController = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
