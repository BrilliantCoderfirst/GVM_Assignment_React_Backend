const express = require("express");
const flightDetailsModel = require("../model/ProductModel");
const AuthModel = require("../model/authenticationModel");
const BuyModel = require("../model/buyModel");
const ProductModel = require("../model/ProductModel");

module.exports.detailForAdmin = async function detailForAdmin(req, res) {
  try {
    let data = await BuyModel.aggregate([
      {
        $lookup: {
          from: AuthModel.collection.name,
          let: { userId: "$user" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userId"],
                },
              },
            },
            {
              $project: {
                name: 1,
                email: 1,
                contact: 1,
                role: 1
              },
            },
          ],
          as: "user_Data",
        },
      },
      {
        $unwind: {
          path: "$user_Data",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: ProductModel.collection.name,
          let: { productId: "$product" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$productId"],
                },
              },
            },
            {
              $project: {
                user: 1,
                productName: 1,
                productType: 1,
                price: 1,
                compnayName: 1
              },
            },
          ],
          as: "product_Data",
        },
      },
      {
        $unwind: {
          path: "$product_Data",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: AuthModel.collection.name,
          let: { vendorId: "$product_Data.user" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$vendorId"],
                },
              },
            },
            {
              $project: {
                name: 1,
                email: 1,
                contact: 1,
                role: 1
              },
            },
          ],
          as: "vendor_Data",
        },
      },
      {
        $unwind: {
          path: "$vendor_Data",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user_Data" },
          product: { $first: "$product_Data" },
          vendorData: { $first: "$vendor_Data" },
        },
      },
      {
        $addFields: {
          "product.user": "$vendorData",
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          product: 1
        },
      },
    ]);
    if (data) {
      res.send({
        message: "Data Is Add Successfully",
        data: data,
        status: 200,
      });
    } else {
      res.send({
        message: "Data Is Not Add Successfully",
        data: data,
        status: 200,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};


module.exports.deleteProductsForAdmin = async function deleteProductsForAdmin(req, res) {
  try {
    let productId = req.params.id;
    console.log("------Product Delete------", productId);
    let data = await BuyModel.findByIdAndDelete(
      { _id: productId }
    );
    if (data) {
      res.send({
        message: "Customer Is Deleted Successfully",
        data: data,
        status: 200,
      });
    } else {
      res.send({
        message: "Customer Is Not Deleted Successfully",
        data: data,
        status: 203,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
