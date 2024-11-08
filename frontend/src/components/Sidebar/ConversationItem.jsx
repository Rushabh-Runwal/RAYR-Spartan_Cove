import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';

const ConversationItem = ({ conversation }) => {
  return (
    <ListItem key={conversation._id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={conversation.name} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={conversation.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {conversation.lastMessage}
            </Typography>
          </React.Fragment>
        }
      />
      <Typography variant="caption" color="text.secondary">
        {conversation.time}
      </Typography>
    </ListItem>
  );
};

export default ConversationItem;