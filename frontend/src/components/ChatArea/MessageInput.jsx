import React from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const MessageInput = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderTop: 1, borderColor: 'divider' }}>
      <IconButton>
        <AttachFileIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type a message"
        inputProps={{ 'aria-label': 'type a message' }}
      />
      <IconButton color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;