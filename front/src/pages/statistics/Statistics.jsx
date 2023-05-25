import React from 'react';
import styles from './Statistics.module.css';
import { connect } from 'react-redux';

class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = 'MedTool | Статистика';
  }

  render() {
    return <div className={styles.root}>
      <div className={styles.header}>
        <h1>Статистика</h1>
      </div>
      <div className={styles.content}></div>
    </div>;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Statistics);
