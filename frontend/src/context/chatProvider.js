import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  // const navigate = useNavigate();
  useEffect(
    () => {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        try {
          const userIn = JSON.parse(userInfo);
          if (userIn) {
            setUser(userIn);
          } else {
            // navigate("/");
          }
        } catch (error) {
          console.error("Error parsing userInfo from localStorage:", error);
        }
      }
    },
    [
      /*navigate*/
    ]
  );
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const useChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
