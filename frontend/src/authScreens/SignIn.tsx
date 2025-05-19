import { useState } from "react";
import { LogoSmall } from "../components/Logo";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <main className="flex flex-col items-center pt-10">
        <LogoSmall />
        <section className="pt-24">
          <h3>Welcome to Chattr.io</h3>
          <p>Sign in to continue where you left off.</p>
          <div className="pt-8 pb-4 flex flex-col gap-4">
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
            <button
              type="submit"
              className="h-14 w-96 rounded-[16px] bg-black p-4 offWhite-text font-semibold"
              onClick={() => {
                handleSignIn();
              }}
            >
              Sign In
            </button>
          </div>
          <p>
            Don't have an account?{" "}
            <a href="/SignUp" className="accent-text font-semibold">
              Sign Up
            </a>
          </p>
        </section>
      </main>
    </>
  );
};

export default SignIn;
