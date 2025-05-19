import { useState } from "react";
import { LogoSmall } from "../components/Logo";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (password !== confirmPassword) return alert("Passwords don't match");
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: username });
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main className="flex flex-col items-center pt-10">
      <LogoSmall />
      <section className="pt-24">
        <h3>Create Your Account</h3>
        <p>Join us and start your journey today.</p>
        <div className="pt-8 pb-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="h-14 w-96 rounded-[16px] border-2 border-black p-4"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            type="email"
            placeholder="EmailAddress"
            className="h-14 w-96 rounded-[16px] border-2 border-black p-4"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="h-14 w-96 rounded-[16px] border-2 border-black p-4"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input
            type="password"
            placeholder="ConfirmPassword"
            className="h-14 w-96 rounded-[16px] border-2 border-black p-4"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></input>
          <button
            type="submit"
            className="h-14 w-96 rounded-[16px] bg-black p-4 offWhite-text font-semibold"
            onClick={() => {
              handleSignUp();
            }}
          >
            Sign Up
          </button>
        </div>
        <p>
          Already have an account?{" "}
          <a href="/SignIn" className="accent-text font-semibold">
            Sign In
          </a>
        </p>
      </section>
    </main>
  );
};
