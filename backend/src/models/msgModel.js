const mongoose = require("mongoose");

const msgModel = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    lobby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lobby",
    },
  },
  {
    timestamps: true,
  }
);

const msg = mongoose.model("msg", msgModel);
module.exports = msg;
