import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, styled } from '@mui/material';
import Sidebar from './Sidebar/Sidebar';
import ChatArea from './ChatArea/ChatArea';

const PageContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
});

const ChatPage = () => {
    const [groups, setGroups] = useState([]);

    // const fetchChats = async () => {
    //     const backend_url = "http://localhost:5002";
    //     const response = await axios.get(`${backend_url}/group`)
    //     console.log(response.data);
    //     setGroups(response.data);
    // }

    // useEffect(() => {
    //     fetchChats();
    // }, []);
    
    return (
        <PageContainer>
            <Sidebar groups={groups} />
            <ChatArea />
        </PageContainer>
    );
}

export default ChatPage;