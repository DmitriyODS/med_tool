import React, { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { useController } from 'react-hook-form';


function CDatePicker(props) {
  const { field, fieldState } = useController({ name: props.name, control: props.control });

  useEffect(() => {
    props.onChangeValue?.(field.value);
  }, [field.value]);

  return (
    <DatePicker
      className={props.className}
      sx={{ width: '100%' }}
      label={props.label}
      disabled={props.disabled}
      format='DD.MM.YYYY'
      value={field.value}
      inputRef={field.ref}
      onChange={field.onChange}
      slotProps={{
        textField: {
          required: props.required,
          name: field.name,
          onBlur: field.onBlur,
          error: fieldState.invalid,
          helperText: fieldState.error?.message,
        },
      }}
    />
  );
}

export default CDatePicker;
