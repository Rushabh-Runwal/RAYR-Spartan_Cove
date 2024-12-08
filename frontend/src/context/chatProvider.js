import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [messageSent, setMessageSent] = useState();
  const [groups, setGroups] = useState([]);
  const [notification, setNotification] = useState([]);
  const [aiChatActivate, setAiChatActivate] = useState(true);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      try {
        const userIn = JSON.parse(userInfo);
        if (userIn) {
          setUser(userIn);
        }
      } catch (error) {
        console.error("Error parsing userInfo from localStorage:", error);
      }
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        messageSent,
        setMessageSent,
        groups,
        setGroups,
        notification,
        setNotification,
        aiChatActivate,
        setAiChatActivate,
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
