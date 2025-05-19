import { io, Socket } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { LogoSmall } from "../components/Logo";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

type UserData = {
  uName: string | null;
  uId: string | null;
};

type Message = {
  user: { uName: string | null; uId: string | null };
  text: string;
  timestamp: string;
};

export const Lobby = () => {
  const { id: lobbyId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userList, setUserList] = useState<UserData[]>([]);
  const [lobbyName, setLobbyName] = useState("");

  // Set current user
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const data = {
        uName: user.displayName,
        uId: user.uid,
      };
      setUserData(data);
    }
  }, []);

  // Setup socket after user is available
  useEffect(() => {
    if (!userData) return;

    const newSocket = io(apiUrl, {
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);
      newSocket.emit("joinLobby", { lobbyId, user: userData });
    });

    newSocket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
    newSocket.on("lobbyName", (lobbyName: string) => {
      setLobbyName(lobbyName);
    });

    newSocket.on("activeUsers", ({ userList }: { userList: UserData[] }) => {
      setUserList(userList);
      console.log(userList);
    });

    newSocket.on("userJoined", ({ user }: { user: UserData }) => {
      const joinMsg = {
        user,
        text: `${user.uName} has joined the lobby.`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, joinMsg]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userData, lobbyId]);

  useEffect(() => {
    if (userData) setLoading(false);
  }, [userData]);

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      const messageData = {
        user: userData!,
        text: inputMessage,
        timestamp: new Date().toISOString(),
      };
      socket.emit("sendMessage", { lobbyId, message: messageData });
      setSentMessages((prev) => [...prev, messageData]);
      setInputMessage("");
    }
  };

  const handleLeaveLobby = async () => {
    if (socket) {
      const messageData = {
        user: userData!,
        text: `${userData?.uName} has left the lobby.`,
      };
      socket.emit("sendMessage", { lobbyId, message: messageData });
      // socket.emit("updateUsers", { lobbyId });
      socket.disconnect();
    }

    await fetch(`${apiUrl}/lobbies/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lobbyId, uid: userData?.uId }),
    }).then((res) => console.log(res));

    navigate("/");
  };

  const allMessages = [...messages, ...sentMessages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex flex-row items-start pt-8 px-8 gap-8">
      <section className="flex flex-col justify-start items-start pr-16 min-w-[280px]">
        <LogoSmall />
        <h3 className="max-w-[18rem] break-words text-2xl font-bold pt-12">
          {lobbyName}
        </h3>
        <p className="pb-8">Lobby ID: {lobbyId}</p>
        <section className="flex flex-col py-4 w-full h-[50vh] overflow-y-scroll">
          <h6 className="text-black font-semibold pb-2">Users Online</h6>
          <div className="flex flex-col gap-2 items-start  ">
            {userList.map((user, index) => (
              <h2
                className="text-black font-medium py-2 border-b-2 border-b-[#979797] w-full"
                key={index}
              >
                {user.uName}
              </h2>
            ))}
          </div>
        </section>
        <button
          onClick={handleLeaveLobby}
          className="mt-12 rounded-lg bg-black p-4 text-white font-semibold"
        >
          Leave Lobby
        </button>
      </section>

      <section className="flex flex-col items-center h-[90vh] w-full">
        <section className="p-8 w-full h-full bg-white rounded-2xl shadow-2xl flex flex-col">
          <h2 className="text-2xl font-bold">Welcome!</h2>
          <p>Here you can chat, play games, or hang out with your friends.</p>

          <div className=" text-white h-full w-full mt-4 p-4 rounded-xl overflow-y-scroll flex flex-col gap-2">
            {allMessages.map((msg, index) => {
              const isSentByUser = msg.user?.uId === userData?.uId;
              return (
                <div
                  key={index}
                  className={`flex flex-col ${
                    isSentByUser
                      ? "items-end text-right"
                      : "items-start text-left"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-[70%] ${
                      isSentByUser ? "bg-green-600" : "bg-gray-800"
                    }`}
                  >
                    <span className="font-semibold">{msg.user?.uName}:</span>{" "}
                    {msg.text}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              );
            })}
          </div>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 mt-4 border border-gray-300 rounded"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
        </section>
      </section>
    </main>
  );
};

export default Lobby;
