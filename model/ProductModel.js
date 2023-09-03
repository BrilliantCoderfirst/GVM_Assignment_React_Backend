const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auths",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    compnayName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel = new mongoose.model("Product", productSchema);
module.exports = ProductModel;
