import React from 'react';
import { Box, Typography } from '@mui/material';

const Message = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          p: 2,
          bgcolor: isUser ? 'primary.main' : 'background.paper',
          borderRadius: 2,
        }}
      >
        <Typography color={isUser ? 'white' : 'text.primary'}>{message.text}</Typography>
      </Box>
    </Box>
  );
};

export default Message;