const express = require("express");
const router = express.Router();
const {
  createLobby,
  getLobbies,
  joinLobby,
} = require("../controllers/lobbyController");

router.post("/join", joinLobby);
router.post("/create", createLobby);
router.get("/", getLobbies);

module.exports = router;
