import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
export default function MultiSelect({options,optionSelectionChanged}) {
    const [personName, setPersonName] = React.useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
      optionSelectionChanged(event.target.value);
    };
  
    return (
      <div>
        <FormControl size="small" sx={{ m: 1, width: 150,border:'none', "& fieldset": { border: 'none' } }}>
            <InputLabel labelId="select-label">Contributer</InputLabel>
          <Select
            labelId="select-label"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {options.map((user) => (
              <MenuItem key={user.userId} value={user.username}>
                <Checkbox checked={personName.indexOf(user.username) > -1} />
                <ListItemText primary={user.username} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }