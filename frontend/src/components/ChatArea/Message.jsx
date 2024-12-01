import React, {useState} from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useChatState } from '../../context/chatProvider';

const Message = ({ message }) => {
  const { user } = useChatState();
  let isUser = false;
  if( message != null || message != undefined)
    isUser = message.sender === user._id; //TODO: Compare the user with the sender of the message
  else
    console.log('Why The fuck is the message null')
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
        <Typography color={isUser ? 'white' : 'text.primary'}>{message.content}</Typography>
      </Box>
    </Box>
  );
};

export default Message;