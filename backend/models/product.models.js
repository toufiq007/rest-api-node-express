import mongoose from "mongoose";

// create a new schema for product data
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, // connected to another mongoose model
      ref: "Category",
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// model for data manipulation
const Product = mongoose.model("Product", productSchema);
export default Product;
