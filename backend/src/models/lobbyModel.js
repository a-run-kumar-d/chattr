// list of lobbies
// lobbie schema
// list of users in lobbie
// user schema
const mongoose = require("mongoose");

const lobbyModel = new mongoose.Schema(
  {
    lobbyName: {
      type: String,
      required: true,
    },
    users: [
      {
        uName: String,
        uId: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const lobby = mongoose.model("lobby", lobbyModel);
module.exports = lobby;
