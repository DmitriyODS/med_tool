import React from 'react';
import styles from './LoadingScreen.module.css';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingScreen(props) {
  return (
    <div className={styles.root}>
      <CircularProgress />
    </div>
  );
}

export default LoadingScreen;
