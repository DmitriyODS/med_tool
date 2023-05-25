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
      name={field.name}
      value={field.value}
      label={props.label}
      disabled={props.disabled}
      onChange={field.onChange}
      onLoadData={props.onLoadData}
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
