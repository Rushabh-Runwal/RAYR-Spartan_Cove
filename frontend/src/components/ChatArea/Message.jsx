import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, styled } from '@mui/material';
import { useChatState } from '../../context/chatProvider';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';

const MessageBubble = styled(Box)(({ theme, isUser }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(2),
  position: 'relative',
  maxWidth: '60%',
  minWidth: '120px',
  marginLeft: isUser ? 'auto' : 0,
  marginRight: isUser ? 0 : 'auto',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  animation: 'fadeIn 0.3s ease-in',
  ...(isUser ? {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderTopRightRadius: 0,
  } : {
    backgroundColor: theme.palette.lightBlue ? theme.palette.lightBlue[100] : '#B3E5FC',
    color: theme.palette.primary.contrastText,
    borderTopLeftRadius: 0,
  }),
}));

const Message = ({ message }) => {
  const { user } = useChatState();
  const [messageStatus, setMessageStatus] = useState('sent');
  const isUser = message?.sender._id === user._id;

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMessageStatus = () => {
    if (!isUser) return null;
    
    return messageStatus === 'read' ? (
      <DoneAllIcon sx={{ fontSize: 16, color: 'primary.light' }} />
    ) : (
      <DoneIcon sx={{ fontSize: 16, color: 'primary.light' }} />
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
        width: '100%',
        '&:hover': {
          '& .message-actions': {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isUser ? 'row-reverse' : 'row',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        {!isUser && (
          <Avatar
            src={message.sender.profilePicture}
            alt={message.sender.name}
            sx={{
              width: 32,
              height: 32,
            }}
          />
        )}

        <Box>
          {!isUser && (
            <Typography
              variant="subtitle2"
              sx={{
                mb: 0.5,
                ml: 1,
                color: 'text.primary',
              }}
            >
              {message.sender.name}
            </Typography>
          )}

          <MessageBubble isUser={isUser}>
            <Typography variant="body2">
              {message.content}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-end',
              gap: 0.5 
            }}>
              <Typography
                variant="caption"
                sx={{
                  color: isUser ? 'primary.light' : 'text.secondary',
                }}
              >
                {formatTime(message.createdAt)}
              </Typography>
              {renderMessageStatus()}
            </Box>
          </MessageBubble>
        </Box>
      </Box>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default Message;
