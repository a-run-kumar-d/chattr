const express = require("express");
const router = express.Router();
const {
  createLobby,
  getLobbies,
  joinLobby,
  leaveLobby,
} = require("../controllers/lobbyController");

router.post("/join", joinLobby);
router.post("/create", createLobby);
router.post("/leave", leaveLobby);
router.get("/", getLobbies);

module.exports = router;
