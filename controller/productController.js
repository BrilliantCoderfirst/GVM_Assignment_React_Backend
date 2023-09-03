const express = require("express");
const ProductModel = require("../model/ProductModel");
const ObjectId = require('mongodb').ObjectId;


// let productData;

// const user = req.user._id;

module.exports.postProducts = async function postProducts(req, res) {
  try {
    let productData = req.body;
    let userId = new ObjectId(productData.user);
    let data = await ProductModel.create({
      user: userId,
      productName: productData.productName,
      productType: productData.productType,
      price: productData.price,
      compnayName: productData.compnayName,
    });
    if (data) {
      res.send({
        message: "Product Is Created Successfully",
        data: data,
        status: 200,
      });
    } else {
      res.send({
        message: "Product Is Not Created Successfully",
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

module.exports.getProducts = async function getProducts(req, res) {
  try {
    let userId = req.params.id;
    let data = await ProductModel.find({ user: userId });
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

module.exports.getParticularProducts = async function getParticularProducts(req, res) {
  try {
    let productId = req.params.id;
    let data = await ProductModel.findById(productId);
    if (data.length !== 0) {
      res.send({
        message: "Get Particular Product Data is available",
        data: data,
        status: 200,
      });
    } else {
      res.send({
        message: "Particular Product Data is not available",
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

module.exports.editProducts = async function editProducts(req, res) {
  try {
    let productId = req.params.id;
    console.log("-------edit Product------", productId, req.body);
    let data = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      {
        user: req.body.user,
        productName: req.body.productName,
        productType: req.body.productType,
        price: req.body.price,
        compnayName: req.body.compnayName,
      },
    );
    if (data) {
      res.send({
        message: "Product Is Updated Successfully",
        data: data,
        status: 200,
      });
    } else {
      res.send({
        message: "Product Is Not Updated Successfully",
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

module.exports.deleteProducts = async function deleteProducts(req, res) {
  try {
    let productId = req.params.id;
    console.log("------Product Delete------", productId);
    let data = await ProductModel.findByIdAndDelete(
      { _id: productId }
    );
    if (data) {
      res.send({
        message: "Product Is Deleted Successfully",
        data: data,
        status: 200,
      });
    } else {
      res.send({
        message: "Product Is Not Deleted Successfully",
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
