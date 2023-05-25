import React from 'react';
import styles from './InputSelect.module.css';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

function InputSelect(props) {
  return (
    <FormControl
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      color={'primary'}
      required={props.required}
      error={props.error}
      className={props.className}
    >
      <InputLabel id={`${props.name}-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${props.name}-label`}
        name={props.name}
        value={props.value}
        label={props.label}
        onChange={props.onChange}
        variant={'outlined'}
        className={styles.root}
        inputRef={props.refCom}
        onBlur={props.onBlur}
      >
        {
          props.items && props.items.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
            );
          })
        }
      </Select>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
}

export default InputSelect;
