import Product from "../models/product.models.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

//  add new products
const addNewProducts = async (req, res) => {
  try {
    const { title, description, price, ratting, category } = req.body;
    if (!title || !description || !price || !ratting || !category) {
      res.status(404).json({
        message: "all fields are required",
      });
    }
    const product = await Product.create({
      title,
      description,
      price,
      ratting,
      category,
    });
    res.status(201).json({
      success: true,
      message: "product added successfully",
      data: product,
    });
  } catch (err) {
    console.log(err);
  }
};

//  get single product
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      res.status(400).json({
        message: "product not found!!",
      });
    }
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (err) {
    console.log(err);
  }
};

//  delete by id
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "product deleted successfully",
      data: product,
    });
  } catch (err) {
    console.log(err);
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updateProduct = await Product.findByIdAndUpdate(id, {
      title: updateData?.title,
      description: updateData?.description,
      price: updateData?.price,
      ratting: updateData?.ratting,
      category: updateData?.category,
    });
    console.log(updateProduct);
    if (!updateProduct) {
      res.status(404).json({
        message: "failed to update the product",
      });
    }
    res.status(200).json({
      message: "update product successfully",
      data: updateProduct,
    });
  } catch (err) {
    console.log(err);
  }
};

export const productController = {
  getAllProducts,
  addNewProducts,
  getSingleProduct,
  removeProduct,
  updateProduct,
};
