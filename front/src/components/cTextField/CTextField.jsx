import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';
import TextField from '@mui/material/TextField';

function CTextField(props) {
  const { field, fieldState } = useController({ name: props.name, control: props.control });

  useEffect(() => {
    props.onChangeValue?.(field.value);
  }, [field.value]);

  return (
    <TextField
      className={props.className}
      fullWidth={props.fullWidth}
      label={props.label}
      variant={'outlined'}
      disabled={props.disabled}
      value={field.value}
      inputRef={field.ref}
      onBlur={field.onBlur}
      onChange={field.onChange}
      name={field.name}
      required={props.required}
      multiline={props.multiline}
      maxRows={props.maxRows}
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
      type={props.typeField}
    />
  );
}

export default CTextField;
