import React, { useEffect, useState } from 'react';
import {Box, List } from '@mui/material';
import ConversationItem from './ConversationItem';
import axios from 'axios';
import { useChatState } from '../../context/chatProvider';
const ConversationList = ({reloadChats}) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, groups, setGroups } = useChatState();

  useEffect(() => {
    const fetchChats = async () => {
      console.log('rerender triggered')
      const user = JSON.parse(localStorage.getItem('userInfo'))
      const backend_url = "http://localhost:5002";
      const config = {
          headers: { Authorization: `Bearer ${user.token}`},
        };
      const { data } = await axios.get(`${backend_url}/group`, config);
      setGroups(data);
      if (data.length > 0 && !selectedChat) {
        console.log('We are setting chat id')
        setSelectedChat(data[0]._id);
        console.log('The default id which will be selected' + data[0]._id )
      }
    }
    fetchChats();
   
  }, [reloadChats]);

  // TODO: The selected chat state does not get set on first click
  return (
    <List sx={{ overflow: 'auto', flexGrow: 1 }}>
      {groups.map((conv) => (
        <Box
        key={conv._id}
        onClick={() => {
          setSelectedChat(conv._id);
          console.log("New selected chat:", selectedChat);
        }}
        sx={{
          cursor: 'pointer',
          backgroundColor: selectedChat === conv._id ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
          color: selectedChat === conv._id ? '#1a1d21' : 'inherit',
          borderRadius: 'lg',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: selectedChat === conv._id ? 
              'rgba(25, 118, 210, 0.12)' : 
              'rgba(25, 118, 210, 0.04)'
          }
        }}
      >
          <ConversationItem conversation={conv} />
        </Box>
      ))}
    </List>
  );
};

export default ConversationList;