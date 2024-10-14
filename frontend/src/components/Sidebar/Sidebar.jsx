import React from 'react';
import { Box, styled } from '@mui/material';
import SidebarHeader from './SidebarHeader';
import SearchBar from './SearchBar';
import ConversationList from './ConversationList';
import SidebarFooter from './SidebarFooter';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 300,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader />
      <SearchBar />
      <ConversationList />
      <SidebarFooter />
    </SidebarContainer>
  );
};

export default Sidebar;