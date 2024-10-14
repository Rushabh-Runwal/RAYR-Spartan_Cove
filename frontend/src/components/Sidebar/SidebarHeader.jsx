import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const SidebarHeader = () => {
  return (
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h6">Chats</Typography>
      <IconButton>
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default SidebarHeader;