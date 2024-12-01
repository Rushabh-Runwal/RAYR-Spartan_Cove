import React, { useEffect, useState } from 'react';
import {Box, List } from '@mui/material';
import ConversationItem from './ConversationItem';
import axios from 'axios';
import { useChatState } from '../../context/chatProvider';
const ConversationList = ({reloadChats}) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, groups, setGroups } = useChatState();
  const fetchChats = async () => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const backend_url = "http://localhost:5002";
    const config = {
        headers: { Authorization: `Bearer ${user.token}`},
      };
    const { data } = await axios.get(`${backend_url}/group`, config);
    setGroups(data);
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [reloadChats]);


  return (
    <List sx={{ overflow: 'auto', flexGrow: 1 }}>
      {groups.map((conv) => (
        <Box
        key={conv._id}
        onClick={() => {
          setSelectedChat(conv)
        }}
        cursor="pointer"
        backgroundColor={selectedChat === conv ? "#fff" : "inherit"}
        color={selectedChat === conv ? "#1a1d21" : "inherit"}
        borderRadius="lg" >
          <ConversationItem conversation={conv} />
        </Box>
      ))}
    </List>
  );
};

export default ConversationList;