import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem, Badge } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import io from 'socket.io-client';
import { useChatState } from '../../context/chatProvider';
import { BACKEND_URL } from '../../config/config.js';


const ENDPOINT = BACKEND_URL;
let socket;

const ChatHeader = ({selectedChat, setSelectedChat, setReloadChats}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useChatState();
  const open = Boolean(anchorEl);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    
    socket.on("user online", (users) => {
      setOnlineUsers(users);
    });

    socket.on("group updated", (updatedGroup) => {
      if (selectedChat?._id === updatedGroup._id) {
        setSelectedChat(updatedGroup);
      }
    });

    return () => {
      socket.off("typing");
      socket.off("stop typing");
      socket.off("user online");
      socket.off("group updated");
    };
  }, [selectedChat]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateGroup = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: { Authorization: `Bearer ${user.token}`},
      };
      
      const response = await axios.put(`${ENDPOINT}/group/${selectedChat._id}/update`, {
        // Add update data here
      }, config);
      
      socket.emit("group update", response.data);
      handleClose();
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: { Authorization: `Bearer ${user.token}`},
      };
      
      await axios.delete(`${ENDPOINT}/group/${selectedChat._id}`, config);
      socket.emit("group deleted", selectedChat._id);
      setSelectedChat(null);
      setReloadChats(prev => !prev);
      handleClose();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const isGroupOnline = selectedChat?.users?.some(u => 
    onlineUsers.includes(u._id) && u._id !== user._id
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      p: 2, 
      borderBottom: 1, 
      borderColor: 'divider',
      backgroundColor: 'background.paper' 
    }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="success"
        invisible={!isGroupOnline}
      >
        <Avatar sx={{ mr: 2 }}>
          {selectedChat?.avatar || selectedChat?.name[0]}
        </Avatar>
      </Badge>
      
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6">
          {selectedChat?.name}
        </Typography>
        {isTyping && (
          <Typography variant="caption" color="text.secondary">
            Someone is typing...
          </Typography>
        )}
      </Box>

      <IconButton
        aria-label="more"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleUpdateGroup}>Update Group</MenuItem>
        <MenuItem onClick={handleDeleteGroup}>Delete Group</MenuItem>
      </Menu>
    </Box>
  );
};

export default ChatHeader;
