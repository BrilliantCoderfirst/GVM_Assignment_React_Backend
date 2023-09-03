const express = require("express");
const customerRoutes = express.Router();
const { getProductCustomer, buyProductCustomer, getBuyProductCustomer } = require("../controller/customerController");

customerRoutes.route("/getProductCustomer").get(getProductCustomer);
customerRoutes.route("/buyProductCustomer/:userId/:productId").post(buyProductCustomer);
customerRoutes.route("/getBuyProductCustomer/:id").get(getBuyProductCustomer);

module.exports = customerRoutes;