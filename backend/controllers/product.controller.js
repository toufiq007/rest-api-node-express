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
    const findProduct = await Product.findById(id);

    // check if any data is passed for update or not
    if (!Object.keys(updateData).length) {
      return res.status(404).json({ message: "no data found to update" });
    }
    // find if product is present or not
    if (!findProduct) {
      res.status(404).json({
        message: "product not found",
      });
    }

    // method one --> to update the product data
    //  update the product data
    Object.keys(updateData).forEach((key) => {
      if (findProduct[key] !== undefined) {
        findProduct[key] = updateData[key];
      }
    });

    // method two --> update the product data
    // findProduct.title = updateData?.title || findProduct.title;
    // findProduct.description =
    //   updateData?.description || findProduct.description;
    // findProduct.price = updateData?.price || findProduct.price;
    // findProduct.ratting = updateData?.ratting || findProduct.ratting;
    // findProduct.category = updateData?.category || findProduct.category;

    const updateProduct = await findProduct.save();
    res.status(200).json({
      message: "product updated",
      data: updateProduct,
    });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: err.message,
    });
  }
};

export const productController = {
  getAllProducts,
  addNewProducts,
  getSingleProduct,
  removeProduct,
  updateProduct,
};
