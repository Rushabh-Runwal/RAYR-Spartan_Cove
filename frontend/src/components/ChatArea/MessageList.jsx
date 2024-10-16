import React from 'react';
import { Box } from '@mui/material';
import Message from './Message';

const MessageList = () => {
  const messages = [
    { id: 1, text: 'Hello!', sender: 'user' },
    { id: 2, text: 'Hi there!', sender: 'other' },
    // Add more messages as needed
  ];

  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </Box>
  );
};

export default MessageList;