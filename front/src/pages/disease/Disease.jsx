import React from 'react';
import styles from './Disease.module.css';

class Disease extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={styles.root}>Disease</div>;
  }
}

export default Disease;
