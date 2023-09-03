const express = require("express");
const BuyModel = require("../model/buyModel");
const ProductModel = require("../model/ProductModel");
const { default: mongoose } = require("mongoose");


module.exports.getProductCustomer = async function getProductCustomer(req, res) {
    try {
      let data = await ProductModel.find();
      if (data.length !== 0) {
        res.send({
          message: "Data is available",
          data: data,
          status: 200,
        });
      } else {
        res.send({
          message: "Data is not available",
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

module.exports.buyProductCustomer = async function buyProductCustomer(req, res) {
    try {
      let userId = req.params.userId;
      let productId = req.params.productId;
      let data = await BuyModel.create({ user: userId, product: productId });
      if (data) {
        res.send({
          message: "Product Buy Successfully",
          data: data,
          status: 200,
        });
      } else {
        res.send({
          message: "Product Is Not Buy Successfully",
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

module.exports.getBuyProductCustomer = async function getBuyProductCustomer(req, res) {
    try {
      let userId = req.params.id;
      console.log("+++++", userId);
      let data = await BuyModel.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId)
          }
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
          $group: {
            _id: "$_id",
            user: { $first: "$user" },
            product: { $first: "$product_Data" },
          },
        },
      ]);
      if (data) {
        res.send({
          message: "All Buy Product",
          data: data,
          status: 200,
        });
      } else {
        res.send({
          message: "Product Is Not Found",
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