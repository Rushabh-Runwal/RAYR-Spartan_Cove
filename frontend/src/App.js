// src/App.js
import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/Signup";
import ChatPage from "./components/ChatPage";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userInfo") !== null;
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/chats",
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
