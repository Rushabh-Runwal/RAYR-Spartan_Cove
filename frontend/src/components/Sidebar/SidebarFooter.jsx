import React from 'react';
import { Box, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useChatState } from '../../context/chatProvider';

const SidebarFooter = () => {
  const { setSelectedChat} = useChatState();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
      <IconButton onClick={() => {
        const spartanConversation = {
          id: 'spartan-ai',
          name: 'Spartan AI'
        }
      }}>
        <ChatIcon />
      </IconButton>
    </Box>
  );
};

export default SidebarFooter;