import React from 'react';
import styles from './Auth.module.css';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import {
  Button,
  Paper,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { connect } from 'react-redux';
import { changeAuthMode, selectAuthMode } from '../../store/authSlice';
import InputPassword from '../../components/inputPassword/InputPassword';
import SelectField from '../../components/selectField/SelectField';

class Auth extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeAuthHandler = (event, newValue) => {
    this.props.dispatch(changeAuthMode(newValue));
  };

  onLoginHandler = () => {

  };

  onRegisterHandler = () => {

  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.logo}>
          <MedicalServicesOutlinedIcon color={'primary'} className={styles.logoPic} />
          <p className={styles.logoText}>MedTool</p>
        </div>
        <Paper className={styles.authCard}>
          <Tabs value={this.props.authMode} onChange={this.onChangeAuthHandler}>
            <Tab label={'Вход'} />
            <Tab label={'Регистрация'} />
          </Tabs>
          <form className={styles.form}>
            <TextField className={styles.spaceBottom} id={'login-input'} label={'Логин'} variant={'outlined'} />
            {
              this.props.authMode === 0 && (
                <InputPassword className={styles.passwordField} id={'password-input'} />
              )
            }
            {
              this.props.authMode === 1 && (
                <>
                  <TextField className={styles.spaceBottom} id={'fio-input'} label={'ФИО'} variant={'outlined'} />
                  <TextField id={'height-input'} className={styles.spaceBottom} label={'Рост'} variant={'outlined'}
                             type={'number'} />
                  <SelectField id={'gender-input'} label={'Пол'} items={[
                    { value: 0, label: 'Мужской' },
                    { value: 1, label: 'Женский' },
                  ]} />
                </>
              )
            }
            <Button className={styles.spaceTop} variant={'contained'}>
              {this.props.authMode === 0 ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authMode: selectAuthMode(state),
});

export default connect(mapStateToProps)(Auth);
