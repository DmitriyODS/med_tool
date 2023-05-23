import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './fallback.module.css';

function FallBack() {
  return (
    <div className={styles.root}>
      <CircularProgress />
    </div>
  );
}

export default FallBack;
