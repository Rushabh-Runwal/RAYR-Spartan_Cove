import React, { useState, useEffect } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Badge, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import io from 'socket.io-client';
import { useChatState } from '../../context/chatProvider';
import { BACKEND_URL } from '../../config/config.js';
const ENDPOINT = BACKEND_URL;
let socket;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ConversationItem = ({ conversation }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastMessage, setLastMessage] = useState(conversation.lastMessage);
  const { user, selectedChat } = useChatState();

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on("user online", (onlineUsers) => {
      const isUserOnline = conversation?.users?.some(u => 
        onlineUsers.includes(u._id) && u._id !== user._id
      );
      setIsOnline(isUserOnline);
    });

    socket.on("message received", (newMessage) => {
      if (newMessage.chat._id === conversation._id) {
        setLastMessage(newMessage);
        if (selectedChat?._id !== conversation._id) {
          setUnreadCount(prev => prev + 1);
        }
      }
    });

    return () => {
      socket.off("user online");
      socket.off("message received");
    };
  }, [conversation._id, selectedChat]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString();
  };

  const truncateMessage = (message, maxLength = 30) => {
    if (!message) return '';
    return message.length > maxLength 
      ? `${message.substring(0, maxLength)}...` 
      : message;
  };

  return (
    <ListItem 
      alignItems="flex-start"
      sx={{
        backgroundColor: selectedChat?._id === conversation._id ? 'action.selected' : 'inherit',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
        borderRadius: 1,
        mb: 0.5,
      }}
    >
      <ListItemAvatar>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          invisible={!isOnline}
        >
          <Avatar alt={conversation.name} src={conversation.groupAdmin?.profilePicture || "/static/images/avatar/1.jpg"} />
        </StyledBadge>
      </ListItemAvatar>
      
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography component="span" variant="subtitle1">
              {conversation.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatTime(lastMessage?.createdAt)}
            </Typography>
          </Box>
        }
        secondary={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              sx={{ display: 'inline', maxWidth: '70%' }}
              component="span"
              variant="body2"
              color="text.secondary"
            >
              {truncateMessage(lastMessage?.content)}
            </Typography>
            {unreadCount > 0 && (
              <Badge 
                badgeContent={unreadCount} 
                color="primary"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

export default ConversationItem;
