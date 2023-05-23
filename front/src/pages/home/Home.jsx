import React from 'react';
import styles from './Home.module.css';
import { Outlet } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.root}>
        <Outlet />
      </div>
    );
  }
}

export default Home;
