import React from 'react';
import { Box } from '@mui/material';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatArea = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </Box>
  );
};

export default ChatArea;