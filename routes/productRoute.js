const express = require("express");
const productRoutes = express.Router();

const { postProducts, getProducts, editProducts, deleteProducts, getParticularProducts } = require("../controller/productController");
const { verifyUserToken } = require("../middleware/authMiddleware");

productRoutes.route("/postProducts").post(postProducts);
productRoutes.route("/getProducts/:id").get(getProducts);
productRoutes.route("/getParticularProducts/:id").get(getParticularProducts);
productRoutes.route("/editProducts/:id").put(editProducts);
productRoutes.route("/deleteProducts/:id").delete(deleteProducts);

module.exports = productRoutes;
