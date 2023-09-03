const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
});

const UserSessionModel = mongoose.model("UserSession", userSessionSchema);
module.exports = UserSessionModel;
