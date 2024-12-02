import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Message from './Message';
import axios from 'axios';
import { useChatState } from '../../context/chatProvider';

const MessageList = () => {
  const [messageList, setMessageList] = useState([]);
  const { user, selectedChat, groups } = useChatState();

  useEffect(() => {
    console.log('rerender triggered')
    const fetchMessages = async () => {
      const backend_url = "http://localhost:5002";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
    
      try {
        const response = await axios.get(`${backend_url}/messages/${selectedChat}`, config);
        setMessageList(response.data);
        console.log( 'The length of the response is' + response.data.length)
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    if( groups.length > 0 && selectedChat )
      fetchMessages();
  }, [user, selectedChat]);

  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
      {(() => {
        const messageElements = [];
        for (let i = 0; i < messageList.length; i++) {
          messageElements.push(
            <Message key={messageList[i]} message={messageList[i]} />
          );
        }
        return messageElements;
      })()}
    </Box>
  );
};

export default MessageList;
