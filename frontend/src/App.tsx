import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SignUp } from "./authScreens/SignUp";
import { Home } from "./pages/Home";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

import { auth } from "./firebase";
import SignIn from "./authScreens/SignIn";
import { Lobby } from "./pages/lobby";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/SignIn" />} />
        <Route path="/lobby/:id" element={<Lobby />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
