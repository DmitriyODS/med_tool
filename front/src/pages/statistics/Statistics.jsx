import React from 'react';
import styles from './Statistics.module.css';
import { connect } from 'react-redux';
import { CartesianGrid, Line, LineChart, Tooltip, YAxis } from 'recharts';
import {
  getStatistics,
  selectLoadingStatistics,
  selectStatistics,
} from '../../store/statisticsSlice';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';

class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = 'MedTool | Статистика';
    this.props.dispatch(getStatistics());
  }

  renderGraphics = () => {
    return (
      <>
        <div className={styles.monitor}>
          <LineChart
            width={1200}
            height={300}
            data={this.props.data}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="pressure" stroke="#369dc9" dot={false} />
            <CartesianGrid stroke="#ccc" strokeDasharray={0} />
            <YAxis />
            <Tooltip />
          </LineChart>
          <h2 className={styles.subtitle}>Мониторинг давления</h2>
        </div>
        <div className={styles.monitor}>
          <LineChart
            width={1200}
            height={300}
            data={this.props.data}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="pulse" stroke="#369dc9" dot={false} />
            <CartesianGrid stroke="#ccc" strokeDasharray={0} />
            <YAxis />
            <Tooltip />
          </LineChart>
          <h2 className={styles.subtitle}>Мониторинг пульса</h2>
        </div>
        <div className={styles.monitor}>
          <LineChart
            width={1200}
            height={300}
            data={this.props.data}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="weight" stroke="#369dc9" dot={false} />
            <CartesianGrid stroke="#ccc" strokeDasharray={0} />
            <YAxis />
            <Tooltip />
          </LineChart>
          <h2 className={styles.subtitle}>Мониторинг веса</h2>
        </div>
        <div className={styles.monitor}>
          <LineChart
            width={1200}
            height={300}
            data={this.props.data}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="sugar" stroke="#369dc9" dot={false} />
            <CartesianGrid stroke="#ccc" strokeDasharray={0} />
            <YAxis />
            <Tooltip />
          </LineChart>
          <h2 className={styles.subtitle}>Мониторинг сахара</h2>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <h1>Статистика</h1>
        </div>
        <div className={styles.content}>
          {this.props.isLoading ? <LoadingScreen /> : this.renderGraphics()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: selectStatistics(state),
    isLoading: selectLoadingStatistics(state),
  };
}

export default connect(mapStateToProps)(Statistics);
