// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAqIY5Zt0k0lc61z-i9MBCMh-9GLwxBkLo",
  authDomain: "chat-app-2216d.firebaseapp.com",
  projectId: "chat-app-2216d",
  storageBucket: "chat-app-2216d.appspot.com",
  messagingSenderId: "208477745533",
  appId: "1:208477745533:web:5e4ebfcb600e9af1a05c14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
