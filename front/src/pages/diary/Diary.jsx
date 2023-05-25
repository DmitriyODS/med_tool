import React from 'react';
import styles from './Diary.module.css';
import { Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';
import { selectCurItem, selectFilterDay, setFilterDay } from '../../store/diarySlice';
import { DiaryTable } from './table';
import { DiaryToolBar } from './toolbar';

class Diary extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeFilterDataHandler = (event, newValue) => {
    this.props.dispatch(setFilterDay(newValue));
  };

  componentDidMount() {
    document.title = 'MedTool | Дневник';
  }

  render() {
    return <div className={styles.root}>
      <div className={styles.header}>
        <h1>Дневник</h1>
        <div className={styles.filters}>
          <Tabs value={this.props.filterDay} onChange={this.onChangeFilterDataHandler} textColor={'secondary'}
                indicatorColor={'secondary'} disabled={true}>
            <Tab label={'Все'} />
            <Tab label={'Утро'} />
            <Tab label={'День'} />
            <Tab label={'Вечер'} />
          </Tabs>
        </div>
      </div>
      <DiaryToolBar curItem={this.props.curItem} />
      <DiaryTable className={styles.content} />
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    filterDay: selectFilterDay(state),
    curItem: selectCurItem(state),
  };
}

export default connect(mapStateToProps)(Diary);
