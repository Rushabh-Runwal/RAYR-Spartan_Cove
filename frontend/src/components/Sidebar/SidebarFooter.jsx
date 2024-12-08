import React from 'react';
import { Box, IconButton } from '@mui/material';
import { useChatState } from '../../context/chatProvider';
import AssistantIcon from '@mui/icons-material/Assistant';
const SidebarFooter = () => {
  const { setSelectedChat,setAiChatActivate } = useChatState();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
      <IconButton onClick={() => {
        setSelectedChat(null);        
        setAiChatActivate(true)
      }}>
        <AssistantIcon />
      {/* <span style={"padding" : "3"} >Spartan AI</span> */}
      <span style={{ margin: "10px" }}>Spartan AI</span>
      </IconButton>
    </Box>
  );
};

export default SidebarFooter;