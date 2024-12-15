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

// update product -->   not working properly
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    //  find if product is present or nor
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      res.status(404).json({
        message: "product not found",
      });
    }

    // Update fields
    Object.keys(updateData).forEach((key) => {
      findProduct[key] = updateData[key];
    });

    const updateProduct = await findProduct.save();

    res.status(200).json({
      message: "product updated successfully",
      data: updateProduct,
    });

    //  update the product data
    console.log(updateProduct);
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
