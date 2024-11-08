import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function CreateGroupModal({allUsers, setSelectedUsers}) {
  return (
    <Stack alignItems={'center'} spacing={3} sx={{ width: 500 }} >
      <Autocomplete
      sx = {{width: 500}}
        multiple
        id="tags-filled"
        options={allUsers}
        getOptionLabel={(option) => option.name}
        freeSolo
        onChange={(event, values) => {
          setSelectedUsers(values);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip variant="outlined" label={option.name} key={key} {...tagProps} />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Click to add names"
            placeholder="Type to search"
          />
        )}
      />
    </Stack>
  );
}