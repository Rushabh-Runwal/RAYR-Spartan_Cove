import React, { useState } from 'react';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';

const ChatHeader = ({selectedChat, setSelectedChat, setReloadChats}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateGroup = async () => {
    try {
      const response = await axios.put(`/groups/${selectedChat.Id}/update`);
      // Handle successful update
      handleClose();
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('userInfo'))
      const backend_url = `http://localhost:5002`;

      const config = {
        headers: { Authorization: `Bearer ${user.token}`},
      };
      let groupId = selectedChat._id
      console.log("here at delete group API", selectedChat)
      const { data } = await axios.delete(`${backend_url}/group/${groupId}`, config);
      setSelectedChat(null);
      setReloadChats(prev => !prev);
      handleClose();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };
  console.log("This is the selected chat", selectedChat?.name[0])
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Avatar sx={{ mr: 2 }}> {selectedChat?.avatar ? selectedChat?.avatar : selectedChat?.name[0] }</Avatar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>{selectedChat?.name}</Typography>
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