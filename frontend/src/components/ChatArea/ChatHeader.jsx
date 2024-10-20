import React from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import axios from 'axios';
import { useChatState } from '../../context/chatProvider';

const ChatHeader = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Avatar sx={{ mr: 2 }}>R</Avatar>
      /* TODO:The name of the Group needs to replace the static stuff*/
      <Typography variant="h6" sx={{ flexGrow: 1 }}>RAYR - 272 Enterprises Software proj.</Typography>
      <IconButton>
        <VideocamIcon />
      </IconButton>
      <IconButton>
        <CallIcon />
      </IconButton>
    </Box>
  );
};

export default ChatHeader;