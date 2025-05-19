import { useParams, useNavigate } from "react-router-dom";
import { LogoSmall } from "../components/Logo";

const dummyUser = [
  { name: "John Doe" },
  { name: "Jane Doe" },
  { name: "Bob Smith" },
  { name: "Alice Johnson" },
  { name: "Charlie Brown" },
  { name: "John Doe" },
  { name: "Jane Doe" },
  { name: "Bob Smith" },
  { name: "Alice Johnson" },
  { name: "Charlie Brown" },
  { name: "John Doe" },
  { name: "Jane Doe" },
  { name: "Bob Smith" },
  { name: "Alice Johnson" },
  { name: "Charlie Brown" },
];

export const Lobby = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const MyMessage = () => {
    return (
      <div className="absolute bg-white right-2 p-4">
        <p>my message</p>
      </div>
    );
  };
  return (
    <main className="flex flex-row items-center pt-8 px-8">
      <section className="flex flex-col justify-start items-start pr-16">
        <LogoSmall />
        <h3 className="max-w-[18rem] break-words text-2xl font-bold pt-12">
          #justChilling
        </h3>
        <p className="pb-8 ">Lobby ID: {id}</p>
        <section className="flex flex-col py-4 w-full h-[50vh] overflow-y-scroll">
          <h6 className="text-black font-semibold pb-2">Users Online</h6>
          <div className="flex flex-col gap-2 items-start  ">
            {dummyUser.map((user, index) => (
              <h2
                className="text-black font-medium py-2 border-b-2 border-b-[#979797] w-full"
                key={index}
              >
                {user.name}
              </h2>
            ))}
          </div>
        </section>
        <button
          onClick={() => navigate("/")}
          className="mt-12 rounded-lg bg-black p-4 text-white font-semibold"
        >
          Leave Lobby
        </button>
      </section>

      <section className="flex flex-col items-center h-[80vh] w-full">
        <section className="p-8 w-full h-full bg-white rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold">Welcome!</h2>
          <h1>Here you can chat, play games, or hang out with your friends.</h1>
          <section className="bg-black h-[90%] w-full relative">
            <MyMessage />
            <MyMessage />
            <MyMessage />
          </section>
        </section>
      </section>
    </main>
  );
};
