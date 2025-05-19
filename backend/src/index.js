const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const lobbyRoutes = require("./routes/lobbyRoutes");

dotenv.config();

connectDB();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server Running");
});
app.use("/lobbies", lobbyRoutes);

const server = app.listen(5000, console.log(`Server running on port ${PORT}`));
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("joinLobby", ({ lobbyId, user }) => {
    socket.join(lobbyId);
    console.log(`${user.uName} joined lobby ${lobbyId}`);
    // Notify others in the lobby
    socket.to(lobbyId).emit("userJoined", { user });
  });
  // Handle chat messages
  socket.on("sendMessage", ({ lobbyId, message }) => {
    const msg = {
      user: message.user, // { uName, uId }
      text: message.text,
      timestamp: new Date().toISOString(),
    };
    // Broadcast to other users in the lobby
    io.to(lobbyId).emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // You can handle user leave logic here if needed
  });
});
