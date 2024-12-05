import React from 'react';
import { Box } from '@mui/material';
import ChatPage from './ChatPage';


const AIChatArea = () => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
    <ChatPage />
    </Box>
  );
};

export default AIChatArea;