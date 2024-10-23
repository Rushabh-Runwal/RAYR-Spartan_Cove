import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import Sidebar from './Sidebar/Sidebar';
import ChatArea from './ChatArea/ChatArea';
import { useChatState } from '../context/chatProvider';

const PageContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
});

const ChatPage = () => {
  const {user} = useChatState();

  useEffect(() => {
      console.log('Triggered useEffect from chatPage'); // this is firing twice due to react strict mode
  }, []);
  
  return (
      <PageContainer>
          <Sidebar />
          <ChatArea />
      </PageContainer>
  );
}

export default ChatPage;