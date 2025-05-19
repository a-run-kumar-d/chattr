const Lobby = require("../models/lobbyModel"); // adjust path if needed

// @desc Create a new lobby
// @route POST /api/lobbies/create
const createLobby = async (req, res) => {
  const { lobbyName, uid, uname } = req.body;

  if (!lobbyName)
    return res.status(400).json({ message: "Lobby name required" });

  try {
    const lobby = await Lobby.create({
      lobbyName,
      users: [{ uName: uname, uId: uid }],
    });
    res.status(201).json(lobby);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Get all lobbies
// @route GET /api/lobbies
const getLobbies = async (req, res) => {
  try {
    const lobbies = await Lobby.find().sort({ createdAt: -1 });
    res.status(200).json(lobbies);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc join in a lobby
// @route POST /api/lobbies/join
const joinLobby = async (req, res) => {
  const { lobbyId, uid } = req.body;
  try {
    const lobby = await Lobby.findById(lobbyId);
    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found" });
    }
    const userExists = lobby.users.some((user) => user.uId === uid);
    if (!userExists) {
      lobby.users.push({ uName: uname, uId: uid });
      await lobby.save();
      res.status(200).json(lobby);
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createLobby, getLobbies, joinLobby };
