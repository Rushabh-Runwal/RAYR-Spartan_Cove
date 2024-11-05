import React, { useState, useEffect } from 'react';
import { Box,Typography, IconButton, Dialog, Button  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CreateGroupModal from './CreateGroupDialog';
import axios from 'axios';


const SidebarHeader = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const backend_url = "http://localhost:5002";
  const config = {
      headers: { Authorization: `Bearer ${user.token}`},
  };
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewGroup = async () => {
    console.log("Creating new group");
    if (selectedUsers.length > 0) {
      console.log("selectedUsers", selectedUsers);
      let selectedUsersIds = selectedUsers.map((user) => user._id);
      console.log("selectedUsersIds", selectedUsersIds);
      const groupData = {
        name: `New Group ${new Date().getTime()}`,
        admin: user._id,
        participants: [user._id, ...selectedUsersIds],
      };
      const { data: group } = await axios.post(`${backend_url}/group`, groupData, config);
      console.log("group created", group);
      if (group) {
        handleClose();
      }
  }};
  
  const fetchAllUsers = async () => {
    // console.log("Fetching all users");
    const { data } = await axios.get(`${backend_url}/users`, config);
    const filteredUsers = data.filter((u) => u._id !== user._id);
    setAllUsers(filteredUsers);
  }
  useEffect(() => {
    fetchAllUsers();
  }, []);



  return (
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h6">Chats</Typography>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <CreateGroupModal {...{allUsers, selectedUsers, setSelectedUsers}} />
          <Button onClick={createNewGroup} variant="contained">Start a new chat</Button>
      </Dialog>
    </Box>
  );
};

export default SidebarHeader;
