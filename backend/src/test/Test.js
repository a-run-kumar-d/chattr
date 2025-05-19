const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

const lobbyId = "shared-lobby";
const user = { uId: "userA", uName: "Alice" };

socket.on("connect", () => {
  console.log("✅ Alice connected");

  socket.emit("joinLobby", { lobbyId, user });

  setTimeout(() => {
    socket.emit("sendMessage", {
      lobbyId,
      message: { user, text: "Hi from Alice!" },
    });
  }, 1000);
});

socket.on("receiveMessage", (msg) => {
  console.log("💬 [Alice sees]:", msg.user.uName, "said:", msg.text);
});

socket.on("userJoined", ({ user }) => {
  console.log("👋 Alice sees new user joined:", user.uName);
});
