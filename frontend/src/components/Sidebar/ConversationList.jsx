import React from 'react';
import { List } from '@mui/material';
import ConversationItem from './ConversationItem';

const ConversationList = () => {
  const conversations = [
    { id: 1, name: 'Phil', lastMessage: 'Happy Birthday Claire!!', time: '9:56 PM' },
    { id: 2, name: 'Jay Prichet', lastMessage: 'I fucking hate phil', time: '9:52 PM' },
    // Add more conversations as needed
  ];

  return (
    <List sx={{ overflow: 'auto', flexGrow: 1 }}>
      {conversations.map((conv) => (
        <ConversationItem key={conv.id} conversation={conv} />
      ))}
    </List>
  );
};

export default ConversationList;