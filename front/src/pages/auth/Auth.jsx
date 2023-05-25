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
import { AuthTypes, RefreshTokenKey, UrlPages } from '../../globals/consts';
import { Navigate } from 'react-router-dom';
import AuthForm from './authForm/AuthForm';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skipLogin: false,
    };
  }

  onChangeAuthHandler = (event, newValue) => {
    this.props.dispatch(changeAuthMode(newValue));
  };

  onSubmitHandler = (data) => {

  };

  componentDidMount() {
    document.title = 'MedTool | Авторизация';

    // попытаемся найти refresh токен в localStorage
    const refreshToken = localStorage.getItem(RefreshTokenKey);
    if (refreshToken) {
      // если нашли, идём на главную, там знают, что делать
      this.setState({ skipLogin: true });
      return;
    }
  }

  render() {
    return (
      <div className={styles.root}>
        {this.state.skipLogin && <Navigate to={UrlPages.Base} replace />}
        <div className={styles.logo}>
          <MedicalServicesOutlinedIcon color={'primary'} className={styles.logoPic} />
          <p className={styles.logoText}>MedTool</p>
        </div>
        <Paper className={styles.authCard}>
          <Tabs value={this.props.authMode} onChange={this.onChangeAuthHandler}>
            <Tab value={AuthTypes.Auth} label={'Вход'} />
            <Tab value={AuthTypes.Registration} label={'Регистрация'} />
          </Tabs>
          <AuthForm authMode={this.props.authMode} onSubmit={this.onSubmitHandler} />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authMode: selectAuthMode(state),
});

export default connect(mapStateToProps)(Auth);
