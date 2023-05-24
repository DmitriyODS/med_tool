import React from 'react';
import styles from './Auth.module.css';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import { Paper } from '@mui/material';

class Auth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.logo}>
          <MedicalServicesOutlinedIcon color={'primary'} className={styles.logoPic}/>
          <p className={styles.logoText}>MedTool</p>
        </div>
        <Paper className={styles.authCard}>

        </Paper>
      </div>
    );
  }
}

export default Auth;
