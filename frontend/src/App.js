import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import ChatPage from "./components/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/chats",
    element: <ChatPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
