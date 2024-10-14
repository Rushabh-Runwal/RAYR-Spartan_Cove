import React from 'react';
import { Box, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import SettingsIcon from '@mui/icons-material/Settings';

const SidebarFooter = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
      <IconButton>
        <ChatIcon />
      </IconButton>
      <IconButton>
        <CallIcon />
      </IconButton>
      <IconButton>
        <SettingsIcon />
      </IconButton>
    </Box>
  );
};

export default SidebarFooter;