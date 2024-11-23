import React, {useState} from 'react';
import { Box } from '@mui/material';
import Message from './Message';
import axios from 'axios';
import { useChatState } from '../../context/chatProvider';

const MessageList = () => {
  const messages = async () =>{
    const backend_url = "http://localhost:5002"; //TODO: Shouldn't be accessing the URL like this use a config file
    const { user, selectedChat } = useChatState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
  
    const response = await axios.get('${backend_url}/messages', config);
    return response.data;
  }

  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </Box>
  );
};

export default MessageList;