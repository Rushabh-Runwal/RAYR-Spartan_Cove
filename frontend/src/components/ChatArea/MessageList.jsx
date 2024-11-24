import React from 'react';
import { Box } from '@mui/material';
import Message from './Message';

const MessageList = ({selectedChat}) => {
  let messages = selectedChat?.messages;
  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </Box>
  );
};

export default MessageList;