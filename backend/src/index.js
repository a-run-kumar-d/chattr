const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const lobbyRoutes = require("./routes/lobbyRoutes");
const { getUsers, getLobbyName } = require("./controllers/lobbyController");

dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server Running");
});
app.use("/lobbies", lobbyRoutes);

const server = app.listen(5000, console.log(`Server running on port ${PORT}`));
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("joinLobby", ({ lobbyId, user }) => {
    socket.lobbyId = lobbyId;
    socket.user = user;
    socket.join(lobbyId);
    console.log(`${user.uName} joined lobby ${lobbyId}`);
    socket.to(lobbyId).emit("userJoined", { user });
    getUsers(lobbyId).then((userList) => {
      io.to(lobbyId).emit("activeUsers", { userList });
    });
    getLobbyName(lobbyId).then((lobbyName) => {
      io.to(lobbyId).emit("lobbyName", lobbyName);
    });
  });
  // Handle chat messages
  socket.on("sendMessage", ({ lobbyId, message }) => {
    const msg = {
      user: message.user, // { uName, uId }
      text: message.text,
      timestamp: new Date().toISOString(),
    };
    // Broadcast to other users in the lobby
    socket.to(lobbyId).emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    const { lobbyId, user } = socket;
    if (lobbyId && user) {
      getUsers(lobbyId).then((userList) => {
        userList = userList.filter((u) => u.uId !== user.uId);
        io.to(lobbyId).emit("activeUsers", { userList });
        console.log(userList);
      });
    }

    console.log("Client disconnected");
  });
});
