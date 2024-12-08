import React, { useEffect, useState } from 'react';
import { Box, List } from '@mui/material';
import ConversationItem from './ConversationItem';
import axios from 'axios';
import { useChatState } from '../../context/chatProvider';
import io from 'socket.io-client';
import { BACKEND_URL } from '../../config/config.js';


const ENDPOINT = BACKEND_URL;
let socket;

const ConversationList = ({ reloadChats }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, groups, setGroups, setAiChatActivate } = useChatState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    setLoggedUser(user);
    
    // Initialize socket connection
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: { Authorization: `Bearer ${user.token}`},
      };

      const { data } = await axios.get(`${ENDPOINT}/group`, config);
      setGroups(data);

      if (data.length > 0 && !selectedChat) {
        setSelectedChat(data[0]);
      }
    };

    fetchChats();

    // Socket listeners for real-time updates
    socket.on("group updated", (updatedGroup) => {
      setGroups((prevGroups) => {
        return prevGroups.map((group) => 
          group._id === updatedGroup._id ? updatedGroup : group
        );
      });
    });

    socket.on("new group", (newGroup) => {
      setGroups((prevGroups) => [...prevGroups, newGroup]);
    });

    return () => {
      socket.off("group updated");
      socket.off("new group");
    };
  }, [reloadChats]);

  const handleChatSelect = (conv) => {
    setSelectedChat(conv);
    setAiChatActivate(false)
    socket.emit("join chat", conv._id);
  };

  return (
    <List sx={{ overflow: 'auto', flexGrow: 1 }}>
      {groups?.map((conv) => (
        <Box
          key={conv._id}
          onClick={() => handleChatSelect(conv)}
          sx={{
            cursor: 'pointer',
            backgroundColor: selectedChat?._id === conv._id ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
            color: selectedChat?._id === conv._id ? '#1a1d21' : 'inherit',
            borderRadius: 'lg',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: selectedChat?._id === conv._id ?
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
