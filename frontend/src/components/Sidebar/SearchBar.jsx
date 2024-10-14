import React from 'react';
import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', m: 2 }}
    >
      <SearchIcon sx={{ ml: 1, color: 'action.active' }} />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search chats' }}
      />
    </Paper>
  );
};

export default SearchBar;