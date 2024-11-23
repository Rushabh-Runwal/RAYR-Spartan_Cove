import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Message from './Message';
import axios from 'axios';
import { useChatState } from '../../context/chatProvider';

const MessageList = () => {
  const [messageList, setMessageList] = useState([]);
  const { user, selectedChat } = useChatState();

  useEffect(() => {
    const fetchMessages = async () => {
      const backend_url = "http://localhost:5002";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
    
      try {
        const response = await axios.get(`${backend_url}/messages`, config);
        setMessageList(response.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [user, selectedChat]);

  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
      {messageList.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </Box>
  );
};

export default MessageList;
