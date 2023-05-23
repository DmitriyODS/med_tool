import React from 'react';
import styles from './Auth.module.css';

class Auth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={styles.root}>Auth</div>;
  }
}

export default Auth;
