const mongoose = require("mongoose");

const buySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auths",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const BuyModel = new mongoose.model("Buy", buySchema);
module.exports = BuyModel;
