import React, { useEffect } from 'react';
import InputSelect from '../inputSelect/InputSelect';
import { useController } from 'react-hook-form';


function CInputSelect(props) {
  const { field, fieldState } = useController({ name: props.name, control: props.control });

  useEffect(() => {
    props.onChangeValue?.(field.value);
  }, [field.value]);

  return (
    <InputSelect
      className={props.className}
      name={field.name}
      value={field.value}
      label={props.label}
      disabled={props.disabled}
      onChange={field.onChange}
      items={props.items}
      fullWidth={props.fullWidth}
      filters={props.filters}
      required={props.required}
      refCom={field.ref}
      onBlur={field.onBlur}
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
    />
  );
}

export default CInputSelect;
