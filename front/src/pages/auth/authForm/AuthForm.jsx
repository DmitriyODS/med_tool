import React from 'react';
import styles from './AuthForm.module.css';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetAuthFormValidation } from './validation';
import { AuthTypes } from '../../../globals/consts';
import CTextField from '../../../components/cTextField/CTextField';
import CPasswordField from '../../../components/cPasswordField/CPasswordField';
import CDatePicker from '../../../components/cDatePicker/CDatePicker';
import CInputSelect from '../../../components/cInputSelect/CInputSelect';
import { GetInitAuthFormData } from './data';

function AuthForm(props) {
  const isRegistration = props.authMode === AuthTypes.Registration;

  const { handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(GetAuthFormValidation(isRegistration)),
    values: GetInitAuthFormData(isRegistration),
  });

  return (
    <form className={styles.root} onSubmit={handleSubmit(props.onSubmit)}>
      <CTextField
        className={styles.spaceBottom}
        name={'login'}
        label={'Логин'}
        fullWidth
        control={control}
        required
      />
      {
        props.authMode === 1 && (
          <>
            <CTextField
              className={styles.spaceBottom}
              name={'fio'}
              label={'ФИО'}
              fullWidth
              control={control}
              required
            />
            <CTextField
              className={styles.spaceBottom}
              name={'height'}
              label={'Рост'}
              fullWidth
              control={control}
              required
              typeField={'number'}
            />
            <CDatePicker
              className={styles.spaceBottom}
              name={'birthday'}
              label={'Дата рождения'}
              fullWidth
              control={control}
              required
            />
            <CInputSelect
              className={styles.spaceBottom}
              name={'gender'}
              label={'Пол'}
              fullWidth
              control={control}
              required
              items={[
                { value: 0, label: 'Мужской' },
                { value: 1, label: 'Женский' },
              ]}
            />
          </>
        )
      }
      <CPasswordField
        className={styles.passwordField}
        name={'password'}
        label={'Пароль'}
        fullWidth
        control={control}
        required
      />
      <Button
        className={styles.spaceTop}
        variant={'contained'}
        onClick={handleSubmit(props.onSubmit)}
      >
        {props.authMode === 0 ? 'Войти' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
}

export default AuthForm;