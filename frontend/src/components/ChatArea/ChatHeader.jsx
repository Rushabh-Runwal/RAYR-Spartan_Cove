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
      /* TODO: The name of the Group needs to be fetched from the backend
       * We either need to have a field on the user which stores all the groups he/she is a part of
       * or need an API route in groups which returns the list of groups a user is a part of
      */
      <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
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