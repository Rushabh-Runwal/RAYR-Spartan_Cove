import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import Message from './Message';
import axios from 'axios';
import { useChatState } from '../../context/chatProvider';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5002";
let socket;

const MessageList = () => {
  const [messageList, setMessageList] = useState([]);
  const [typing, setTyping] = useState(false);
  const { user, selectedChat, messageSent, groups } = useChatState();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);

    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));

    socket.on("message received", (newMessage) => {
      if (selectedChat && selectedChat._id === newMessage.chat._id) {
        setMessageList(prev => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off("typing");
      socket.off("stop typing");
      socket.off("message received");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        const response = await axios.get(`${ENDPOINT}/messages/${selectedChat._id}`, config);
        setMessageList(response.data);
        socket.emit("join chat", selectedChat._id);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    if (groups.length > 0 && selectedChat) {
      fetchMessages();
    }
  }, [user, selectedChat, messageSent]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        overflowY: 'scroll', 
        scrollbarWidth: 'none', 
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }} 
    >
      {messageList.map((message) => (
        <Message key={message._id} message={message} />
      ))}
      {typing && (
        <Box sx={{ padding: 1 }}>
          Someone is typing...
        </Box>
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessageList;
