import React from 'react';
import styles from './InputPassword.module.css';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function InputPassword(props) {
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const onChangeShowPasswordHandler = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <FormControl className={props.className} sx={{ m: 1, width: '25ch' }} variant={'outlined'} fullWidth>
      <InputLabel htmlFor={'outlined-adornment-password'}>Пароль</InputLabel>
      <OutlinedInput
        id={props.id}
        type={isShowPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position={'end'}>
            <IconButton
              aria-label={'toggle password visibility'}
              onClick={onChangeShowPasswordHandler}
              edge='end'
            >
              {isShowPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={'Пароль'}
      />
    </FormControl>
  );
}

export default InputPassword;