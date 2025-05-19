import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXE2Anbg5bNvyOTg1IHCkpNUb4_QnelzE",
  authDomain: "chattr-47a40.firebaseapp.com",
  projectId: "chattr-47a40",
  storageBucket: "chattr-47a40.firebasestorage.app",
  messagingSenderId: "34194854456",
  appId: "1:34194854456:web:08d55e32e08571e74bcccd",
  measurementId: "G-KHTHEZ48C2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
