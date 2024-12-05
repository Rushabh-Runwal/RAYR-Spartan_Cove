import React, { useState, useEffect } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from 'axios';
import { useChatState } from '../../context/chatProvider';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5002";
let socket;

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const { user, selectedChat, messageSent, setMessageSent } = useChatState();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const sendMessage = async () => {
    if (message.trim() && selectedChat) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(`${ENDPOINT}/messages`, {
          senderId: user._id,
          groupId: selectedChat._id,
          content: message,
          attachmentUrl: '',
          messageType: "text"
        }, config);

        socket.emit("new message", {
          ...data,
          chat: selectedChat,
          sender: user
        });

        setMessage('');
        setMessageSent(true);
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderTop: 1, borderColor: 'divider' }}>
      <IconButton>
        <AttachFileIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type a message"
        inputProps={{ 'aria-label': 'type a message' }}
        value={message}
        onChange={handleMessageChange}
        onKeyPress={handleKeyPress}
        multiline
        maxRows={4}
      />
      <IconButton 
        color="primary" 
        onClick={sendMessage}
        disabled={!message.trim()}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
