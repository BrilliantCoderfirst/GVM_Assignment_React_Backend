const mongoose = require("mongoose");
const emailValidator = require("email-validator");


const AuthScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 9,
  },
  role: {
    type: String,
    required: true,
  },
});

const AuthModel = new mongoose.model("Auths", AuthScheme);
module.exports = AuthModel;
