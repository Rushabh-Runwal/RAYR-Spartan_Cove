import React, {useState} from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from 'axios';
import { useChatState } from '../../context/chatProvider';

const MessageInput = () => {
  const [ message, setMessage ] = useState('');
  const { user, selectedChat, messageSent, setMessageSent } = useChatState();
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const sendMessage = async () => {
    const backend_url = "http://localhost:5002"; 
    if (message.trim() && selectedChat) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        await axios.post('http://localhost:5002/messages', {
          senderId: user._id,
          groupId: selectedChat,
          content: message,
          attachmentUrl: '',
          messageType:"text" //TODO: Make it dynamic if needed
        }, config);

        setMessage('');
        setMessageSent( true );
      } catch (error) {
        console.error("Error sending message:", error);
      }
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
      /> 
      <IconButton color="primary" onClick = {sendMessage}>
        <SendIcon /> 
      </IconButton>
    </Box>
  );
};

export default MessageInput;