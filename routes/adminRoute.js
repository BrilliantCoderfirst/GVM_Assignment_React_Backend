const express = require("express");
const adminRoutes = express.Router();
const { detailForAdmin, deleteProductsForAdmin } = require("../controller/adminController");

adminRoutes.route("/detailForAdmin").get(detailForAdmin);
adminRoutes.route("/deleteProductsForAdmin/:id").delete(deleteProductsForAdmin);

module.exports = adminRoutes;
