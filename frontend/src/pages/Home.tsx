const apiUrl = import.meta.env.VITE_API_URL;

import { useEffect, useState } from "react";
import { LogoBase } from "../components/Logo";
import { auth } from "../firebase";
import { SendHorizontal, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Lobby = {
  lobbyName: string;
  lobbyId: string;
};

export const Home = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [searchingLobbyName, setSearchingLobbyName] = useState<string>("");
  const [creatingLobbyName, setCreatingLobbyName] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lobbies, setLobbies] = useState<Lobby[]>([]);

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const response = await fetch(`${apiUrl}/lobbies`);
        const data = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedLobbies = data.map((e: any) => ({
          lobbyName: e.lobbyName,
          lobbyId: e._id,
        }));

        setLobbies(formattedLobbies);
      } catch (error) {
        console.error("Error fetching lobbies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLobbies();
  }, []);

  const createLobby = async (lobbyname: string) => {
    try {
      const response = await fetch(`${apiUrl}/lobbies/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lobbyName: lobbyname,
          uid: user?.uid,
          uname: user?.displayName,
        }),
      });

      const data = await response.json();
      console.log("Lobby created:", data);
      navigate(`/lobby/${data._id}`);
    } catch (error) {
      console.error("Error creating lobby:", error);
    }

    setShowDropdown(false);
  };
  const joinLobby = async (id: string) => {
    try {
      await fetch(`${apiUrl}/lobbies/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lobbyId: id,
          uid: user?.uid,
          uname: user?.displayName,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            navigate(`/lobby/${id}`);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error joining lobby:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <main className="relative">
      {showDropdown && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}

      <section
        style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)" }} // shadow
        className="flex flex-col items-center pt-8 relative z-50 pb-8"
      >
        <p>you have logged in as</p>
        <h2 className="text-2xl font-bold">{user?.displayName}</h2>

        <div className="pt-12">
          <LogoBase />
        </div>

        <div className="pt-8 flex flex-row gap-4 items-center">
          <button
            type="button"
            className="h-14 w-48 rounded-[16px] bg-black p-4 offWhite-text font-medium"
            onClick={() => setShowDropdown(true)}
          >
            Create Lobby
          </button>

          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Enter code to join a public/private lobby..."
              value={searchingLobbyName}
              className="h-14 w-[36rem] rounded-[16px] border-2 border-black p-4 pr-14"
              onChange={(e) => setSearchingLobbyName(e.target.value)}
            />
            {searchingLobbyName && (
              <button
                type="submit"
                className="flex items-center "
                onClick={() => joinLobby(searchingLobbyName)}
              >
                <SendHorizontal
                  className="absolute right-4 text-black"
                  size={20}
                />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="pt-12 flex flex-col gap-4 pb-4 overflow-y-scroll items-center bg-white w-full">
        <div>
          <p>Ready to meet new people and start chatting?</p>
          <h3>Explore public lobbies!</h3>
        </div>
        {lobbies.map((e) => {
          return (
            <div className="h-14 flex justify-between w-[36rem] rounded-[16px] border-2 border-black p-4">
              <p>{e.lobbyName}</p>
              <button
                className=""
                onClick={() => {
                  joinLobby(e.lobbyId);
                }}
              >
                <ArrowRight />
              </button>
            </div>
          );
        })}
      </section>
      {showDropdown && (
        <section className="bg-white h-max w-max p-8 backdrop-blur-3xl rounded-[16px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center z-50">
          <h2 className="text-2xl font-bold">Create a new lobby</h2>
          <input
            type="text"
            placeholder="Enter a name for your new lobby"
            value={creatingLobbyName}
            className="h-14 w-96 rounded-[16px] border-2 border-black p-4"
            onChange={(e) => setCreatingLobbyName(e.target.value)}
          />
          <button
            type="button"
            className="h-14 w-48 rounded-[16px] bg-black p-4 offWhite-text font-medium"
            onClick={() => createLobby(creatingLobbyName)}
          >
            Create Lobby
          </button>
          <button
            onClick={() => setShowDropdown(false)}
            className="text-sm text-gray-500 mt-2 underline"
          >
            Cancel
          </button>
        </section>
      )}

      <footer className="fixed bottom-0 py-2 w-full px-8 flex flex-row justify-between bg-black z-50">
        <p className="text-white">Arunkumar D</p>
        <button className="accent-text" onClick={() => auth.signOut()}>
          Sign Out
        </button>
      </footer>
    </main>
  );
};
