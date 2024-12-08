import React from 'react';
import { Box } from '@mui/material';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChatState } from '../../context/chatProvider';

const ChatArea = ({reloadChats, setReloadChats}) => {
  
  const { selectedChat, setSelectedChat } = useChatState();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
      <ChatHeader setReloadChats={setReloadChats} selectedChat = {selectedChat} setSelectedChat = {setSelectedChat}/>
      <MessageList selectedChat = {selectedChat}/>
      <MessageInput />
    </Box>
  );
};

export default ChatArea;