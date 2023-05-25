import React from 'react';
import styles from './AuthForm.module.css';
import { Button, TextField } from '@mui/material';
import InputPassword from '../../../components/inputPassword/InputPassword';
import SelectField from '../../../components/selectField/SelectField';
import { DatePicker } from '@mui/x-date-pickers';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetAuthFormValidation } from './validation';
import { AuthTypes } from '../../../globals/consts';

function AuthForm(props) {
  const isRegistration = props.authMode === AuthTypes.Registration;

  const { handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(GetAuthFormValidation(isRegistration)),
    values: dataField,
  });

  return (
    <form className={styles.root} onSubmit={}>
      <TextField
        className={styles.spaceBottom}
        id={'login-input'}
        label={'Логин'}
        variant={'outlined'}
      />
      {
        props.authMode === 0 && (
          <InputPassword
            className={styles.passwordField}
            id={'password-input'}
          />
        )
      }
      {
        props.authMode === 1 && (
          <>
            <TextField
              className={styles.spaceBottom}
              id={'fio-input'}
              label={'ФИО'}
              variant={'outlined'}
            />
            <TextField
              id={'height-input'}
              className={styles.spaceBottom}
              label={'Рост'}
              variant={'outlined'}
              type={'number'}
            />
            <DatePicker
              className={styles.spaceBottom}
              label={'Дата рождения'}
              format='DD.MM.YYYY'
            />
            <SelectField
              id={'gender-input'}
              label={'Пол'}
              items={[
                { value: 0, label: 'Мужской' },
                { value: 1, label: 'Женский' },
              ]}
            />
          </>
        )
      }
      <Button
        className={styles.spaceTop}
        variant={'contained'}
      >
        {props.authMode === 0 ? 'Войти' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
}

export default AuthForm;