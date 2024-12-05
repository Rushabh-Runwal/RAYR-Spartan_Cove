import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useChatState } from '../../context/chatProvider';
import { BACKEND_URL } from '../../config/config.js';


const ChatPage = () => {

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const { user } = useChatState();
  let config = {
    headers: { Authorization: `Bearer ${user.token}`},
  };
  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        
        const response = await axios.get(`${BACKEND_URL}/xai/getaichat`, config);
        
        setMessages([ {role: "system", content: "Hi, Spartan AI for your rescue. What do you wanna know?"} ,...response.data.messages.slice(2)] || []);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  // Scroll to the bottom when messages are updated
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      role: "user",
      content: userInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/xai/`, { query: userInput }, config);
    //   console.log("Response from backend:", response.data);

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: response.data,
        },
      ]);      
      
    } catch (error) {
      console.error("Error sending query:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message) => {

    // Format the message
    const formattedMessage = message
        .replace(/### (.*?)(\n|$)/g, '<h3>$1</h3>') // Convert ### to <h3>
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold for **text**
        .replace(/- (.*?)$/gm, '<li>$1</li>') // List items
        .replace(/- \*\*(.*?)\*\*/g, '<li><strong>$1</strong></li>') // Bold list items
        .replace(/\n/g, '<br>') // Line breaks for better rendering
        .replace(/<br><li>/g, '<ul><li>') // Start unordered list
        .replace(/<\/li><br>/g, '</li></ul>'); // Close unordered list

    return formattedMessage
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#121212",
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#1e88e5" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spartan AI
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Chat Messages */}
      <Box
        ref={chatContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
          backgroundColor: "#1e1e1e",
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: message.role === "user" ? "row-reverse" : "row",
              alignItems: "flex-start",
              marginBottom: 2,
            }}
          >
            <Paper
              elevation={2}
              sx={{
                padding: 1.5,
                backgroundColor:
                  message.role === "user" ? "#90caf9" : "#f5f5f5",
                color: message.role === "user" ? "#000" : "#000",
                maxWidth: "70%",
                borderRadius: 3,
              }}
            >
                    <div dangerouslySetInnerHTML={{ __html: renderMessage(message.content) }} />
            </Paper>
          </Box>
        ))}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={20} />
            <Typography variant="caption" sx={{ color: "#fff", ml: 1 }}>
              Assistant is typing...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Input Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#1e1e1e",
          borderTop: "1px solid #444",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          sx={{
            backgroundColor: "#2e2e2e",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              color: "#fff",
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{ marginLeft: 1 }}
          disabled={isLoading}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatPage;
