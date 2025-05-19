const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

const lobbyId = "shared-lobby";
const user = { uId: "userB", uName: "Bob" };

socket.on("connect", () => {
  console.log("✅ Bob connected");

  socket.emit("joinLobby", { lobbyId, user });

  setTimeout(() => {
    socket.emit("sendMessage", {
      lobbyId,
      message: { user, text: "Hello from Bob!" },
    });
  }, 2000);
});

socket.on("receiveMessage", (msg) => {
  console.log("💬 [Bob sees]:", msg.user.uName, "said:", msg.text);
});

socket.on("userJoined", ({ user }) => {
  console.log("👋 Bob sees new user joined:", user.uName);
});
