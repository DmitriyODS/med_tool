import React from 'react';
import styles from './SelectField.module.css';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function SelectField(props) {
  const [value, setValue] = React.useState();

  const onChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <Select
        labelId={props.id}
        id={props.id}
        value={value}
        label={props.label}
        onChange={onChangeHandler}
      >
        {props.items &&
          props.items.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}

export default SelectField;
