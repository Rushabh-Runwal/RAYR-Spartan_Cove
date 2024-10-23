import React, { useState } from 'react';
import { Box, 
  Typography, Avatar,
  IconButton, Dialog, DialogTitle, List, ListItem, ListItemText, Button, Checkbox, ListItemButton,ListItemAvatar  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
const SidebarHeader = () => {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    { id: 1, name: 'Phil' , email: 'phil@example.com' , phone: '123-456-7890' , profilePicture: 'https://example.com/phil.jpg', },
    { id: 2, name: 'Jay Prichet' , email: 'jay@example.com' , phone: '123-456-7890' , profilePicture: 'https://example.com/phil.jpg', },
    { id: 3, name: 'Claire' , email: 'claire@example.com' , phone: '123-456-7890' , profilePicture: 'https://example.com/phil.jpg', },

    // Add more users as needed
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserSelect = (user) => {
    setSelectedUsers([user]); // For a one-to-one chat; modify this for group chats
  };
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h6">Chats</Typography>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a User to Chat</DialogTitle>
        <List>
          {users.map((user) => (
            
                      <ListItem
                      key={user.id}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(user.id)}
                          checked={checked.includes(user.id)}
                          inputProps={{ 'aria-labelledby': user.id }}
                        />
                      }
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar
                            alt={`Avatar n°${user.id}`}
                            // src={}
                          />
                        </ListItemAvatar>
                        <ListItemText id={user.id} primary={user.name} />
                      </ListItemButton>
                    </ListItem>
                    
          ))}
        </List>
        <Box sx={{ height: '60vh', width: '80vw',   display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button sx={{ height:'50px', width: '200px', mt: 2 }}
            onClick={handleClose} variant="contained">Start a new chat</Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default SidebarHeader;
