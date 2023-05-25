import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';
import PasswordField from '../passwordField/PasswordField';

function CPasswordField(props) {
  const { field, fieldState } = useController({
    name: props.name,
    control: props.control,
  });

  useEffect(() => {
    props.onChangeValue?.(field.value);
  }, [field.value]);

  return (
    <PasswordField
      fullWidth={props.fullWidth}
      label={props.label}
      disabled={props.disabled}
      value={field.value}
      refCom={field.ref}
      onBlur={field.onBlur}
      onChange={field.onChange}
      name={field.name}
      required={props.required}
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
    />
  );
}

export default CPasswordField;
