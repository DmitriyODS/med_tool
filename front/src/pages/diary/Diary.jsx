import React from 'react';
import styles from './Diary.module.css';

class Diary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={styles.root}>Diary</div>;
  }
}

export default Diary;
