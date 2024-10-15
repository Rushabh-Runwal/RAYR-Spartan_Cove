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

    const fetchChats = async () => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const backend_url = "http://localhost:5002";
        const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
        const { data } = await axios.get(`${backend_url}/group`, config);
        console.log(data);
        setGroups(data);
    }

    useEffect(() => {
        fetchChats();
        console.log('i fire once'); // this is firing twice due to react strict mode
    }, []);
    
    return (
        <PageContainer>
            <Sidebar groups={groups} />
            <ChatArea />
        </PageContainer>
    );
}

export default ChatPage;