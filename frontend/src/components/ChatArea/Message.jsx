import React from 'react';
import { Box, Avatar, Typography, styled } from '@mui/material';
import { useChatState } from '../../context/chatProvider';

// Styled components for custom message bubbles
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
  ...(isUser ? {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderTopRightRadius: 0,
  } : {
    backgroundColor: theme.palette.lightBlue ? theme.palette.lightBlue[100] : '#B3E5FC',
    color: theme.palette.primary .contrastText,
    borderTopLeftRadius: 0,
  }),
}));

const Message = ({ message }) => {
  const { user } = useChatState();
  const isUser = message?.sender._id === user._id;

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
        width: '100%',
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
        {/* Profile Picture - Only show for non-user messages */}
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
          {/* Sender Name - Only show for non-user messages */}
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

          {/* Message Bubble */}
          <MessageBubble isUser={isUser}>
            <Typography variant="body2">
              {message.content}
            </Typography>
            
            {/* Timestamp */}
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 0.5,
                color: isUser ? 'primary.light' : 'text.secondary',
                textAlign: 'right',
              }}
            >
              {formatTime(message.createdAt)}
            </Typography>
          </MessageBubble>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;